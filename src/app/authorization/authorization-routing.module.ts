import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseAuthorizationComponent} from './base-authorization/base-authorization.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {EmailComponent} from './email/email.component';
import {PasswordComponent} from './password/password.component';

const routes: Routes = [
  {
    path: '', component: BaseAuthorizationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'email', component: EmailComponent},
      {path: 'password/:token', component: PasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {
}
