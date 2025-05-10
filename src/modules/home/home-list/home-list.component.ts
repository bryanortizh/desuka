import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  openVoiceSearch() {
  }
}
