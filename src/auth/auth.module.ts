import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { authService } from 'src/services/auth.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoginEmailComponent } from './login-email/login-email.component';

const Component = [LoginComponent, LoginEmailComponent];
const Service = [authService, provideHttpClient(withInterceptorsFromDi())];
@NgModule({
  declarations: Component,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [Service],
})
export class AuthModule {}
