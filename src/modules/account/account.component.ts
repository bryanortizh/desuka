import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountPresenterComponent } from './account.presenter.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountPresenterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AccountComponent {
  constructor(public presenter: AccountPresenterComponent) {
  }

  ionViewWillEnter() {
    // Se ejecuta cada vez que se entra a esta vista
    this.presenter.getUserInfo();
  }

  ngOnDestroy() {
    this.presenter.ngOnDestroy();
  }
}
