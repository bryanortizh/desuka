import { Component, OnInit } from '@angular/core';
import { AccountPresenterComponent } from './account.presenter.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountPresenterComponent],
  standalone: false,
})
export class AccountComponent implements OnInit {
  constructor(public presenter: AccountPresenterComponent) {}

  ngOnInit() {
    this.presenter.getUserInfo();
  }
}
