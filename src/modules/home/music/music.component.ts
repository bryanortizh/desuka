import { Component, Input, OnInit } from '@angular/core';
import { Icons } from 'src/core/enum/icons.enum';
import { MusicPresenterComponent } from './music.presenter.component';
import { FunctionPlayerService } from 'src/services/functionPlayer.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: [MusicPresenterComponent],
  standalone: false,
})
export class MusicComponent implements OnInit {
  @Input() player!: any;
  isLikedIcon = Icons.coffee;
  playIcon = Icons.playArrow;
  pauseIcon = Icons.pause;

  constructor(public presenter: MusicPresenterComponent,
    public functionPlayer: FunctionPlayerService
  ) { }

  ngOnInit() {
  }

  stopFunctionPlayer(event: Event): void {
    this.functionPlayer.stopFunctionPlayer(event);
  }
}
