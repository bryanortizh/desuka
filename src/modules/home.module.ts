import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeRoutingModule } from './home.routing.module';

const Component = [PlayerMusicComponent]


@NgModule({
    declarations: Component,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
