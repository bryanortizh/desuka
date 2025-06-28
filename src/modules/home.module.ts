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
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TabsComponent } from './home/tabs/tabs.component';
import { AccountComponent } from './account/account.component';
import { authService } from 'src/services/auth.service';

const Component = [
  TabsComponent,
  PlayerMusicComponent,
  MusicComponent,
  HomeListComponent,
  AccountComponent
];
const Service = [
  FunctionPlayerService,
  musicService,
  authService,
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
