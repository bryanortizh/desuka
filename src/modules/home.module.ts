import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeRoutingModule } from './home.routing.module';
import { MusicComponent } from './home/music/music.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';
import { musicService } from 'src/services/music.service';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const Component = [PlayerMusicComponent, MusicComponent, HomeListComponent];
const Service = [
  FunctionPlayerService,
  musicService,
  provideHttpClient(withInterceptorsFromDi()),
];
@NgModule({
  declarations: Component,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HomeRoutingModule,
  ],
  providers: [Service],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
