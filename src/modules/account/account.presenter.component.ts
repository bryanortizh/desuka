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
  userId = localStorage.getItem('userId') || 'default-uuid';
  destroy$ = new Subject<void>();
  userInfo: responseVerify | null = null;

  constructor(private navigate: Router, private authService: authService) {}

  getUserInfo() {
    const parseId = JSON.parse(this.userId);
    const verifyData: verifyUser = {
      uuid: '',
      userId: parseId,
    };
    this.authService
      .verifyUser(verifyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.userInfo = results;
        },
        error: (err) => {},
      });
  }

  loggoutSession() {
    const parseId = JSON.parse(this.userId);
    const verifyData: logoutUser = {
      userId: parseId,
    };
    this.authService.logout(verifyData).subscribe({
      next: () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.navigate.navigate(['/auth/login']);
      },
      error: (err) => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.navigate.navigate(['/auth/login']);
      },
    });
  }
}
