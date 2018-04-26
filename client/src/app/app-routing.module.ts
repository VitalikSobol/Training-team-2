import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  // { path: 'vacancies', loadChildren: './base-pages/vacancies/vacancies.module#VacanciesModule' }
  {path: '', loadChildren: './base-pages/base.module#BaseModule'}
  // { path: '', component: AppComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
