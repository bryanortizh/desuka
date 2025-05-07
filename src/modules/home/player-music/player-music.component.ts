import { Component, OnDestroy, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Icons } from 'src/core/enum/icons.enum';
import { Track } from 'src/core/interface/tracker.interface';
import { ImageService } from 'src/services/imageBg.service';

@Component({
  selector: 'app-player-music',
  templateUrl: './player-music.component.html',
  styleUrls: ['./player-music.component.scss'],
  standalone: false,
})
export class PlayerMusicComponent implements OnInit, OnDestroy {

  skipNextIcon = Icons.skipNext;
  skipPreviousIcon = Icons.skipPrevious;
  playIcon = Icons.playArrow;
  pauseIcon = Icons.pause;
  isLiked = Icons.coffee;
  gradientStyle: string = '';
  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  currentTrackIndex = 0;

  playlist: Track[] = [
    {
      title: 'Chrono',
      artist: 'Monma',
      src: 'assets/music/test.mp3',
      cover: 'assets/img/test.png'
    },
    {
      title: 'Evening Vibes',
      artist: 'Lofigirl',
      src: 'assets/music/test2.mp3',
      cover: 'assets/img/test3.png'
    },
  ];

  constructor(public imageService: ImageService) { }

  ngOnInit() {
    this.loadTrack();

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
    });

    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  loadTrack() {
    this.imageService.getDominantColorsFromImage(this.currentTrack.cover).then((gradient) => {
      this.gradientStyle = gradient;
    });
    this.audio.src = this.currentTrack.src;
    this.audio.load();
    if (this.isPlaying) this.audio.play();
    this.updateMediaSession();
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
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadTrack();
  }

  previousTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadTrack();
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  toggleLike() {
  }

  async shareTrack() {
    await Share.share({
      title: 'DesukaApp Lofi Song Radio',
      text: `Escucha a ${this.currentTrack.title} - ${this.currentTrack.artist} y unete a la comunidad de DesukaApp`,
      dialogTitle: 'Compartir canción',
      url: 'https://vm.tiktok.com/ZMBohYqv2/',
    });
  }

  updateMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentTrack.title,
        artist: this.currentTrack.artist,
        album: 'DesukaApp Lofi Radio',
        artwork: [
          { src: this.currentTrack.cover, sizes: '96x96', type: 'image/png' },
          { src: this.currentTrack.cover, sizes: '128x128', type: 'image/png' },
          { src: this.currentTrack.cover, sizes: '192x192', type: 'image/png' },
          { src: this.currentTrack.cover, sizes: '256x256', type: 'image/png' },
          { src: this.currentTrack.cover, sizes: '384x384', type: 'image/png' },
          { src: this.currentTrack.cover, sizes: '512x512', type: 'image/png' },
        ],
      });
  
      navigator.mediaSession.setActionHandler('play', () => this.togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => this.togglePlay());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.previousTrack());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.nextTrack());
    }
  }

  get currentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }
}
