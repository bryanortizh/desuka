import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerMusicPresenterComponent } from 'src/modules/home/player-music/player-music.presenter.component';

@Injectable()
export class FunctionPlayerService {
  private _currentTrack =
    new BehaviorSubject<PlayerMusicPresenterComponent | null>(null);
  private _searchTrack = new BehaviorSubject<any>(null);
  setCurrentTrack(track: PlayerMusicPresenterComponent): void {
    this._currentTrack.next(track);
  }

  getCurrentTrack$() {
    return this._currentTrack.asObservable();
  }

  getCurrentTrack(): PlayerMusicPresenterComponent | null {
    return this._currentTrack.value;
  }
  stopFunctionPlayer(stopEvent: Event): void {
    stopEvent.stopPropagation();
  }

  setMusicSearch(track: any): void {
    console.log('setMusicSearch', track);
    this._searchTrack.next(track);
  }

  getMusicSearch$() {
    return this._searchTrack.asObservable();
  }
}
