import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerMusicComponent } from '../player-music/player-music.component';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';

@Component({
    selector: 'app-music-presenter',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MusicPresenterComponent {

    constructor(private modalCtrl: ModalController,
                private functionPlayerService: FunctionPlayerService
    ) { }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: PlayerMusicComponent,
            breakpoints: [0],
            initialBreakpoint: 1,
            backdropDismiss: false,
            expandToScroll: false,
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'confirm') {
            console.log('Modal closed with data:', data);
        }
    }

    toggleLike(stopEvent: Event): void {
        this.functionPlayerService.stopFunctionPlayer(stopEvent);
    }

    togglePlay(stopEvent: Event): void {
        this.functionPlayerService.stopFunctionPlayer(stopEvent);
    }
}