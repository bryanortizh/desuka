import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  standalone: false,
})
export class HomeListComponent implements OnInit {
  searchForm!: FormGroup;


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

    if (!available) {
      console.error('Speech recognition no está disponible en este dispositivo.');
      return;
    }

    const hasPermission = await SpeechRecognition.checkPermissions();
    console.log("hasPermission", hasPermission)
    if (!hasPermission.speechRecognition) {
      await SpeechRecognition.requestPermissions();
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
