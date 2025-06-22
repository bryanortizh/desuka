import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { HomeListPresenterComponent } from './home-list.presenter.component';
import { PlayerMusicComponent } from '../player-music/player-music.component';
import { PlayerMusicPresenterComponent } from '../player-music/player-music.presenter.component';
import { musicService } from 'src/services/music.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  standalone: false,
  providers: [HomeListPresenterComponent],
})
export class HomeListComponent implements OnInit {
  searchForm!: FormGroup;
  iconSVGSearch = IconsSVG.searchSVG;
  iconSVGMicrophone = IconsSVG.microphoneSVG;

  constructor(
    private formBuilder: FormBuilder,
    public presenter: HomeListPresenterComponent,
  ) {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.presenter.getMusic();
    this.presenter.getCategory();
  }

  searchMusic() {
    const searchValue = this.searchForm.get('search')?.value;
  }

  async openVoiceSearch() {
    const available = await SpeechRecognition.available();

    if (!available) {
      return;
    }

    const hasPermission = await SpeechRecognition.requestPermissions();
    if (!hasPermission.speechRecognition) {
      await SpeechRecognition.checkPermissions();
    }
    SpeechRecognition.start({
      language: 'es-ES',
      maxResults: 1,
      prompt: 'Habla ahora...',
      partialResults: true,
      popup: true,
    })
      .then((result) => {
        if (result.matches && result.matches.length > 0) {
          const spokenText = result.matches[0];
          this.searchForm.patchValue({ search: spokenText });
        }
      })
      .catch((error) => {});
  }
}
