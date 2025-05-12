import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/core/enum/icons.enum';
import { MusicPresenterComponent } from './music.presenter.component';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: [MusicPresenterComponent],
  standalone: false,
})
export class MusicComponent  implements OnInit {

  isLikedIcon = Icons.coffee;
  playIcon = Icons.playArrow;
  pauseIcon = Icons.pause;

  constructor(public presenter: MusicPresenterComponent) { }

  ngOnInit() {

  }
 
}
