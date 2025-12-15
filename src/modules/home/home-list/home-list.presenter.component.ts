import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';
import { statusPlayer } from 'src/core/enum/statusPlayer.enum';
import { TimeOut } from 'src/core/enum/timeout.enum';
import { Category } from 'src/core/interface/category.interface';
import { Track } from 'src/core/interface/tracker.interface';
import { musicService } from 'src/services/music.service';

@Component({
  selector: 'app-home-list-presenter',
  template: '',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeListPresenterComponent {
  playlist: Track[] = [];
  indexMusic: number = 0;
  showCompleteMusic: boolean = false;
  statusPlayer = '';
  searchResults: Track[] = [];
  listCategory: Category[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private musicService: musicService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showHideMusicBar() {
    const musicBar = document.querySelector('.music-bar');
    if (musicBar) {
      musicBar.classList.toggle('show');
    }
  }

  sendTrackPlayer(musicList: Track[], index: number, oneMusic: Track) {
    this.destroyMusicModal();
    this.playlist = musicList;
    this.indexMusic = index;
    this.cdr.detectChanges();
    this.showCompleteMusic = true;
    setTimeout(() => {
      this.showMusicModal();
    }, TimeOut.VERY_SHORT);
  }

  showMusicModal() {
    var modalMusic = document.querySelector('ion-modal');
    if (modalMusic) {
      modalMusic.keepContentsMounted = true;
      modalMusic.present();
      this.cdr.detectChanges();
    }
  }

  destroyMusicModal() {
    this.showCompleteMusic = false;
    var modalMusic = document.querySelector('ion-modal');

    if (modalMusic) {
      modalMusic.keepContentsMounted = false;
      modalMusic.dismiss();
      this.cdr.detectChanges();
    }
  }

  closeMusicComplete(event: Event) {
    this.statusPlayer = statusPlayer.MINIMIZED;
  }

  filterPlaylist(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();
    this.playlist = this.playlist.filter((track) => {
      return (
        track.title.toLowerCase().includes(value) ||
        track.artist.toLowerCase().includes(value)
      );
    });
    this.cdr.detectChanges();
  }

  getMusic() {
    this.musicService
      .getMusic()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al buscar música:', err);
        },
      });
  }

  getCategory() {
    this.musicService
      .getCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.listCategory = results;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al buscar música:', err);
        },
      });
  }
}
