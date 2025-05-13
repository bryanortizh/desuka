import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PlayerMusicPresenterComponent } from "src/modules/home/player-music/player-music.presenter.component";


@Injectable()
export class FunctionPlayerService {

    private _currentTrack = new BehaviorSubject<PlayerMusicPresenterComponent | null>(null);

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
}