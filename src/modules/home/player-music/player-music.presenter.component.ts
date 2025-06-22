import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
import { Subject, takeUntil } from 'rxjs';
import { Icons } from 'src/core/enum/icons.enum';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { MusicLike } from 'src/core/interface/music.interface';
import { Track } from 'src/core/interface/tracker.interface';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';
import { ImageService } from 'src/services/imageBg.service';
import { musicService } from 'src/services/music.service';

@Component({
  selector: 'app-player-music-presenter',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlayerMusicPresenterComponent {
  playlist: Track[] = [];
  modalCtrl!: ModalController;
  skipNextIcon = Icons.skipNext;
  skipPreviousIcon = Icons.skipPrevious;
  playIcon = IconsSVG.playSVG;
  pauseIcon = IconsSVG.pauseSVG;
  isLikedIcon = IconsSVG.coffeLikeisSVG;
  shareIcon = IconsSVG.shareSVG;
  gradientStyle: string = '';
  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  currentTrackIndex = 0;
  private destroy$ = new Subject<void>();

  constructor(
    public imageService: ImageService,
    public capacitorService: CapacitorFunctionService,
    public musicService: musicService
  ) {}

  async loadTrack(playlist: Track[]) {
    this.playlist = playlist;
    this.getMusicById(this.currentTrack.id);
    this.imageService
      .getDominantColorsFromImage(this.currentTrack.coverImage)
      .then((gradient) => {
        this.gradientStyle = gradient;
        this.audio.src = this.currentTrack.audioFile;
        this.audio.load();
        this.isPlaying = true;
        this.capacitorService.barNotificationMusic(this.currentTrack);
        if (this.isPlaying) this.audio.play();
      });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onSeek(event: any) {
    this.audio.currentTime = event.target.value;
  }

  nextTrack() {
    this.audio.src = '';
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlist.length;
    this.capacitorService.barNotificationMusic(this.currentTrack);
    this.loadTrack(this.playlist);
  }

  previousTrack() {
    this.audio.src = '';
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.playlist.length) %
      this.playlist.length;
    this.capacitorService.barNotificationMusic(this.currentTrack);
    this.loadTrack(this.playlist);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  minimizeMusic() {
    var modalMusic = document.querySelector('ion-modal');
    if (modalMusic) {
      modalMusic.dismiss();
    }
  }

  get currentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }

  getMusicById(id: number) {
    this.isLikedIcon = IconsSVG.coffeDontLikeSVG;
    this.musicService
      .getLikeMusicbyId(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: MusicLike) => {
          this.isLikedIcon = result.isLike
            ? IconsSVG.coffeLikeisSVG
            : IconsSVG.coffeDontLikeSVG;
        },
        error: (err) => {
          this.isLikedIcon = IconsSVG.coffeDontLikeSVG;
          console.error('Error al obtener música por ID:', err);
        },
      });
  }
  changeLikeMusicbyId(id: number) {
    this.musicService
      .changeLikeMusicbyId(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: MusicLike) => {
          this.isLikedIcon = result.isLike
            ? IconsSVG.coffeLikeisSVG
            : IconsSVG.coffeDontLikeSVG;
        },
        error: (err) => {
          this.isLikedIcon = IconsSVG.coffeDontLikeSVG;
          console.error('Error al obtener música por ID:', err);
        },
      });
  }
}
