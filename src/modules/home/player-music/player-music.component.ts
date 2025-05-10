import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
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

  async loadTrack() {
    const fileUrl = await this.getFileUrl(this.currentTrack.cover);

    console.log(fileUrl);

    this.imageService.getDominantColorsFromImage(this.currentTrack.cover).then((gradient) => {
      this.gradientStyle = gradient;
    });
    this.audio.src = this.currentTrack.src;
    this.audio.load();
    if (this.isPlaying) this.audio.play();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
    this.barNotificationMusic();
  }

  onSeek(event: any) {
    this.audio.currentTime = event.target.value;
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.barNotificationMusic();
    this.loadTrack();
  }

  previousTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.barNotificationMusic();
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

  async getFileUrl(relativePath: string): Promise<string> {
    const filePath = await Filesystem.getUri({
      path: relativePath,
      directory: Directory.Cache,
    });

    return filePath.uri;
  }

  async barNotificationMusic() {
    CapacitorMusicControls.create({
      track: this.currentTrack.title, // optional, default : ''
      artist: this.currentTrack.artist, // optional, default : ''
      album: this.currentTrack.title, // optional, default: ''
      cover: 'https://img001.prntscr.com/file/img001/zvUpJWbnQJOb39O8dLKCgg.png', // optional, default : nothing
      hasPrev: false, // show previous button, optional, default: true
      hasNext: false, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false
      hasScrubbing: true, // default: false. Enable scrubbing from control center progress bar
      isPlaying: true, // default : true
      dismissable: true, // default : false
      playIcon: "media_play",
      pauseIcon: "media_pause",
      closeIcon: "media_close",
      notificationIcon: "notification",
    })
      .then(() => {
      })
      .catch((e) => {
        console.log(e);
      });

   
  }

  get currentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }
}
