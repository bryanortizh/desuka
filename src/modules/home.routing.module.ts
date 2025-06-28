import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { TabsComponent } from './home/tabs/tabs.component';


const routes: Routes = [
    { path: 'player', component: PlayerMusicComponent },
    { path: 'list', component: HomeListComponent},
    { path: 'system', component: TabsComponent},
    { path: '', redirectTo: 'system', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }