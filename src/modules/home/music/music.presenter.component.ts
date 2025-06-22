import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';

@Component({
    selector: 'app-music-presenter',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MusicPresenterComponent {

    constructor(private functionPlayerService: FunctionPlayerService) { }

    toggleLike(stopEvent: Event): void {
        this.functionPlayerService.stopFunctionPlayer(stopEvent);
    }

    togglePlay(stopEvent: Event): void {
        this.functionPlayerService.stopFunctionPlayer(stopEvent);
    }

    showBarMusic(): boolean {
        return true;
    }

}