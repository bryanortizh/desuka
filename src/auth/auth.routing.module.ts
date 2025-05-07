import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LodashComponent } from './lodash/lodash.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lodash', component: LodashComponent },
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: 'lodash', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }