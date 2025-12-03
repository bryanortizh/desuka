import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TypeRegister } from 'src/core/enum/user_register.enum';
import {
  loginUser,
  registerUser,
  verifyUser,
} from 'src/core/interface/register.interface';
import { authService } from 'src/services/auth.service';
import { ErrorHandlerService } from 'src/services/errorHandler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  invitedUser: TypeRegister = TypeRegister.INVITED;
  destroy$ = new Subject<void>();
  uuid = localStorage.getItem('deviceInfo') || 'default-uuid';
  disabledButton = false;
  constructor(
    private navigate: Router,
    private authService: authService,
    private errorHandler: ErrorHandlerService
  ) {}

  verifyGuest() {
    this.disabledButton = true;
    const parsedUuid = JSON.parse(this.uuid);

    const verifyData: verifyUser = {
      uuid: parsedUuid.identifier,
      userId: 0,
    };
    this.authService
      .verifyUser(verifyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.disabledButton = false;
          localStorage.setItem('tabs', 'home');
          localStorage.setItem('token', results.response.token);
          localStorage.setItem('userId', results.user.id.toString());
          this.navigate.navigate(['/home/system']);
        },
        error: (err) => {
          this.disabledButton = false;
          this.errorHandler.handleError(this, this.invitedUser, err);
        },
      });
  }

  registerUserGuest() {
    this.disabledButton = true;
    const parsedUuid = JSON.parse(this.uuid);

    const userData: registerUser = {
      nickname: this.generateRandomNickname(),
      email: 'example@example.com',
      password: 'Invitado',
      uuid: parsedUuid.identifier,
      type_register: 1,
      type_user: 2,
    };
    this.authService
      .registerUser(userData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.disabledButton = false;
          localStorage.setItem('tabs', 'home');
          localStorage.setItem('token', results.token);
          localStorage.setItem('userId', results.userId.toString());
          this.navigate.navigate(['/home/system']);
        },
        error: (err) => {
          this.disabledButton = false;
          console.error(err);
        },
      });
  }

  loginUser(typeRegister: TypeRegister) {
    this.disabledButton = true;
    const typeRegisterEnum = typeRegister === TypeRegister.INVITED ? 1 : 2;
    const parsedUuid = JSON.parse(this.uuid);
    const userData: loginUser = {
      email: '',
      password: '',
      uuid: parsedUuid.identifier,
      type_register: typeRegisterEnum,
    };
    if (typeRegister === TypeRegister.INVITED) {
      delete userData.email;
      delete userData.password;
    }
    this.authService
      .loginUser(userData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.disabledButton = false;
          localStorage.setItem('tabs', 'home');
          localStorage.setItem('token', results.token);
          localStorage.setItem('userId', results.userId.toString());
          this.navigate.navigate(['/home/system']);
        },
        error: (err) => {
          this.disabledButton = false;
          console.error(err);
        },
      });
  }

  generateRandomNickname(): string {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 dígitos
    return `username${randomNum}`;
  }

  routerEmail() {
    this.navigate.navigate(['/auth/login-email']);
  }
}
