import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { IconsSVG } from 'src/core/enum/images-svg.enum';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  standalone: false,
})
export class HomeListComponent implements OnInit {
  searchForm!: FormGroup;
  iconSVGSearch = IconsSVG.searchSVG;
  iconSVGMicrophone = IconsSVG.microphoneSVG;


  lofiItems = [
    { image: 'assets/lofi-sleep.jpg', title: 'Lofi Sleep' },
    { image: 'assets/lofi-study.jpg', title: 'Lofi Study' },
    { image: 'assets/lofi-room.jpg', title: 'Lofi Room' }
  ];
  
  slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    freeMode: true,
  };

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }


  ngOnInit() { }

  searchMusic() {
    const searchValue = this.searchForm.get('search')?.value;
    console.log('Searching for:', searchValue);
  }

  async openVoiceSearch() { 
    const available = await SpeechRecognition.available();
    Permissions
    if (!available) {
      console.error('Speech recognition no está disponible en este dispositivo.');
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
    }).then((result) => {
      if (result.matches && result.matches.length > 0) {
        const spokenText = result.matches[0];
        console.log('Texto detectado:', spokenText);

        this.searchForm.patchValue({ search: spokenText });
      }
    }).catch((error) => {
      console.error('Error en el reconocimiento de voz:', error);
    });
  }
}
