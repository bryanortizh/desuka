import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import {
  SearchGeneral,
  SearchGeneralResponse,
} from 'src/core/interface/search_general.interface';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';
import { musicService } from 'src/services/music.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  standalone: false,
})
export class SearchBoxComponent implements OnInit {
  iconSVGCamera = IconsSVG.cameraSVG;
  searchText: string = '';
  loadingSearch: boolean = false;
  recentSearches: SearchGeneralResponse[] = [];
  searchResults: SearchGeneralResponse[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    public scannerAudio: CapacitorFunctionService,
    private serviceMusic: musicService,
    private navigator: Router
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

  enterProfile(item: SearchGeneralResponse) {
    this.navigator.navigate(['home/profile', item.id]);
  }

}
