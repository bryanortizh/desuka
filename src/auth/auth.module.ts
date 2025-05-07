import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';

const Component = [LoginComponent]


@NgModule({
  declarations: Component,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule]
})
export class AuthModule { }
