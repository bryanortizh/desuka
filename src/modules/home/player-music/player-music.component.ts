import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PlayerMusicPresenterComponent } from './player-music.presenter.component';
import { Track } from 'src/core/interface/tracker.interface';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';

@Component({
  selector: 'app-player-music',
  templateUrl: './player-music.component.html',
  styleUrls: ['./player-music.component.scss'],
  providers: [PlayerMusicPresenterComponent],
  standalone: false,
})
export class PlayerMusicComponent implements OnInit, OnDestroy {
  @Input() playlist: Track[] = [];
  @Input() indexMusic: number = 0;
  constructor(public presenter: PlayerMusicPresenterComponent, private functionService: FunctionPlayerService) {
  }

  ngOnInit(): void {
    this.presenter.currentTrackIndex = this.indexMusic;
    this.presenter.loadTrack(this.playlist);
    this.functionService.setCurrentTrack(this.presenter);
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
