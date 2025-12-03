import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TypeRegister } from 'src/core/enum/user_register.enum';
import { loginUser } from 'src/core/interface/register.interface';
import { authService } from 'src/services/auth.service';
import { ErrorHandlerService } from 'src/services/errorHandler.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
  standalone: false,
})
export class LoginEmailComponent implements OnInit {
  disabledButton = false;
  destroy$ = new Subject<void>();
  invitedUser: TypeRegister = TypeRegister.INVITED;

  constructor(
    private navigate: Router,
    private authService: authService,
    private errorHandler: ErrorHandlerService
  ) {}

  formUser: FormGroup = new FormGroup({
    email: new FormControl('example@example.com', [Validators.email, Validators.required]),
    password: new FormControl('Invitado', Validators.required),
  });

  ngOnInit() {}

  loginWithEmail() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
      return;
    }
    const typeRegister = 'email';
    const email = this.formUser.get('email')?.value;
    const password = this.formUser.get('password')?.value;
    this.disabledButton = true;
    const typeRegisterEnum = typeRegister === TypeRegister.EMAIL ? 2 : 1;
    const userData: loginUser = {
      email: email,
      password: password,
      uuid: '',
      type_register: typeRegisterEnum,
    };
    delete userData.uuid;
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
}
