import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent }   from './profile/profile.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { AppComponent }      from './app.component';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'vacancies', component: VacanciesComponent },
  { path: '', component: AppComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
