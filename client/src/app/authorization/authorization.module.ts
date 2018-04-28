import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {BaseAuthorizationComponent} from './base-authorization/base-authorization.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule
  ],
  declarations: [BaseAuthorizationComponent, RegisterComponent]
})
export class AuthorizationModule {

}
