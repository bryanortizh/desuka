import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeRoutingModule } from './home.routing.module';
import { MusicComponent } from './home/music/music.component';
import { HomeListComponent } from './home/home-list/home-list.component';

const Component = [PlayerMusicComponent, MusicComponent, HomeListComponent]


@NgModule({
    declarations: Component,
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
