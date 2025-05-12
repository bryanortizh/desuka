import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerMusicPresenterComponent } from './player-music.presenter.component';

@Component({
  selector: 'app-player-music',
  templateUrl: './player-music.component.html',
  styleUrls: ['./player-music.component.scss'],
  providers: [PlayerMusicPresenterComponent],
  standalone: false,
})
export class PlayerMusicComponent implements OnInit, OnDestroy {

  constructor(public presenter: PlayerMusicPresenterComponent) { }
  ngOnInit(): void {
    console.log("this.presenter.audio",this.presenter.audio)
    this.presenter.loadTrack();

    this.presenter.audio.addEventListener('loadedmetadata', () => {
      this.presenter.duration = this.presenter.audio.duration;
    });

    this.presenter.audio.addEventListener('timeupdate', () => {
      this.presenter.currentTime = this.presenter.audio.currentTime;
    });

    this.presenter.audio.addEventListener('ended', () => {
      this.presenter.nextTrack();
    });
  }

  ngOnDestroy(): void {
    this.presenter.audio.pause();
    this.presenter.audio.src = '';
    this.presenter.audio.load();
  }
}
