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
import { SearchBoxComponent } from './search-box/search-box.component';
import { ChatService } from 'src/services/chat.service';
import { ChatComponent } from './home/chat-general/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ConversationComponent } from './home/chat-general/conversation/conversation.component';
import { ProfileComponent } from './home/profile/profile.component';
const config: SocketIoConfig = { 
  url: 'http://localhost:3000', 
  options: {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true
  }
};

const Component = [
  TabsComponent,
  PlayerMusicComponent,
  MusicComponent,
  HomeListComponent,
  AccountComponent,
  SearchBoxComponent,
  ChatComponent,
  ConversationComponent,
  ProfileComponent
];
const Service = [
  FunctionPlayerService,
  musicService,
  authService,
  ChatService,
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
    SocketIoModule.forRoot(config),
  ],
  providers: [Service],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
