import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  logoutUser,
  responseVerify,
  verifyUser,
} from 'src/core/interface/register.interface';
import { authService } from 'src/services/auth.service';

@Component({
  selector: 'app-account-presenter',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPresenterComponent {
  userId = Number(localStorage.getItem('userId'));
  destroy$ = new Subject<void>();
  userInfo: responseVerify | null = null;

  constructor(private navigate: Router, private authService: authService) {}

  getUserInfo() {
    const parseId = Number(localStorage.getItem('userId'));
    const verifyData: verifyUser = {
      uuid: '',
      userId: parseId,
    };
    delete verifyData.uuid; 
    this.authService
      .verifyUser(verifyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.userInfo = results;
          console.log("User Info:", this.userInfo);
        },
        error: (err) => {},
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.userInfo = null;
  }


  loggoutSession() {
    const parseId = Number(localStorage.getItem('userId'));
    const verifyData: logoutUser = {
      userId: parseId,
    };
    this.authService.logout(verifyData).subscribe({
      next: () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('tabs');
        this.navigate.navigate(['/auth/login']);
      },
      error: (err) => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('tabs');
        this.navigate.navigate(['/auth/login']);
      },
    });
  }
}
