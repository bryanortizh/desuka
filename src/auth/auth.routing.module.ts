import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LodashComponent } from './lodash/lodash.component';
import { RegisterComponent } from './register/register.component';
import { LoginEmailComponent } from './login-email/login-email.component';

const routes: Routes = [
  { path: '', component: LodashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
