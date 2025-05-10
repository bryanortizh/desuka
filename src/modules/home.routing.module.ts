import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerMusicComponent } from './home/player-music/player-music.component';
import { HomeListComponent } from './home/home-list/home-list.component';


const routes: Routes = [
    { path: 'player', component: PlayerMusicComponent },
    { path: 'list', component: HomeListComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }