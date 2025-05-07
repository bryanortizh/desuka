import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerMusicComponent } from './home/player-music/player-music.component';


const routes: Routes = [
    { path: '', component: PlayerMusicComponent },
    { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }