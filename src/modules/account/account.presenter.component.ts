import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, finalize } from 'rxjs';
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
  isLoading = false;

  constructor(
    private navigate: Router, 
    private authService: authService,
    private cdr: ChangeDetectorRef
  ) {}

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
          this.cdr.detectChanges(); // Forzar detección de cambios cuando se carga el usuario
        },
        error: (err) => {
          console.error('Error al obtener información del usuario:', err);
          this.cdr.detectChanges();
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.userInfo = null;
  }

  loggoutSession() {
    this.isLoading = true;
    this.cdr.detectChanges(); // Forzar detección de cambios
    
    const parseId = Number(localStorage.getItem('userId'));
    const verifyData: logoutUser = {
      userId: parseId,
    };
    this.authService.logout(verifyData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Forzar detección de cambios
        })
      )
      .subscribe({
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
