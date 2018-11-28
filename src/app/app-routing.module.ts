import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  {path: 'auth', loadChildren: './authorization/authorization.module#AuthorizationModule'},
  {path: '', loadChildren: './base-pages/base.module#BaseModule', canActivateChild:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
