import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { TabsComponent } from './home/tabs/tabs.component';
import { ChatComponent } from './home/chat-general/chat/chat.component';
import { ConversationComponent } from './home/chat-general/conversation/conversation.component';
import { AccountComponent } from './account/account.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [
  { path: 'player', component: PlayerMusicComponent },
  { path: 'list', component: HomeListComponent },
  {
    path: 'system',
    component: TabsComponent,
    children: [
      { path: 'home', component: HomeListComponent },
      { path: 'search', component: SearchBoxComponent },
      { path: 'message', component: ConversationComponent },
      { path: 'account', component: AccountComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: 'chat/:conversationId', component: ChatComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: '', redirectTo: 'system', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
