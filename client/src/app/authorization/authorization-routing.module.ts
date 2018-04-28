import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseAuthorizationComponent} from './base-authorization/base-authorization.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: '', component: BaseAuthorizationComponent,
    children: [
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {
}
