import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseComponent} from './base/base.component';


const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {path: 'profile/:id', loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'interview', loadChildren: './interview/interview.module#InterviewModule'},
      {path: 'vacancies', loadChildren: './vacancies/vacancies.module#VacanciesModule'},
      {path: 'candidates', loadChildren: './candidates/candidates.module#CandidatesModule'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {
}
