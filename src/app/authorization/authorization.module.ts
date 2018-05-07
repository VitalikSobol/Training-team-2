import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {BaseAuthorizationComponent} from './base-authorization/base-authorization.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {EmailComponent} from './email/email.component';
import {PasswordComponent} from './password/password.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    RouterModule,
    NgbAlertModule.forRoot()
  ],
  declarations: [
    BaseAuthorizationComponent,
    RegisterComponent,
    LoginComponent,
    EmailComponent,
    PasswordComponent
  ],

})
export class AuthorizationModule {

}
