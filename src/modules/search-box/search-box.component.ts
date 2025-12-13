import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import {
  SearchGeneral,
  SearchGeneralResponse,
} from 'src/core/interface/search_general.interface';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';
import { musicService } from 'src/services/music.service';
import { HomeListPresenterComponent } from '../home/home-list/home-list.presenter.component';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  standalone: false,
})
export class SearchBoxComponent implements OnInit {
  @Output() goHomeTab: EventEmitter<string> = new EventEmitter<string>();
  iconSVGCamera = IconsSVG.cameraSVG;
  searchText: string = '';
  loadingSearch: boolean = false;
  recentSearches: SearchGeneralResponse[] = [];
  searchResults: SearchGeneralResponse[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    public scannerAudio: CapacitorFunctionService,
    private serviceMusic: musicService,
    private navigator: Router,
    private functionService: FunctionPlayerService
  ) {}

  ngOnInit() {}

  searchTerm() {
    if (this.searchText.trim() === '') {
      this.searchResults = [];
      this.loadingSearch = false;
      return;
    }
    const dataBody: SearchGeneral = {
      searchTerm: this.searchText,
    };
    this.loadingSearch = true;
    this.serviceMusic
      .searchGeneral(dataBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.searchResults = results;
        },
        complete: () => {
          this.loadingSearch = false;
        },
        error: (err) => {
          this.loadingSearch = false;
          console.error('Error al buscar:', err);
        },
      });
  }

  changeTextAudioOrUser(text: number | string): string {
    switch (text) {
      case '1':
        return 'Creador';
      case '2':
        return 'Usuario';
      case '3':
        return 'Administrador';
      case '4':
        return 'Soporte';
      default:
        return '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.recentSearches = [];
  }

  getMusicById(id: number) {
    this.serviceMusic.getMusicbyId(id).subscribe({
      next: (music) => {
        console.log('Música obtenida por ID:', music);
        try {
          this.navigator.navigate(['home/system/home']);
          this.functionService.setMusicSearch({
            track: music,
            index: 0,
            musicList: [music],
          });
        } catch (e) {
          console.warn('No hay suscriptor para goHomeTab', e);
        }

        //this.scannerAudio.playMusicFromSearch(music)
      },
      error: (err) => {
        console.error('Error al obtener la música por ID:', err);
      },
    });
  }

  enterItem(item: SearchGeneralResponse) {
    console.log(item);
    if (item.type === 'audio') {
      this.getMusicById(item.id);
    }
    if (item.type === 'user') {
      this.navigator.navigate(['home/profile', item.id]);
    }
  }
}
