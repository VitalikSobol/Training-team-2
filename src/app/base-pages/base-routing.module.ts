import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseComponent} from './base/base.component';
import {CandidatesComponent} from './candidates/candidates/candidates.component';
import {VacanciesComponent} from './vacancies/vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview/interview.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {CabinetComponent} from './cabinet/cabinet.component';


const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'vacancies', component: VacanciesComponent},
      {path: 'candidates', component: CandidatesComponent},
      {path: 'cabinet', component: CabinetComponent},
      {path: '**', redirectTo: 'interview'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
}
