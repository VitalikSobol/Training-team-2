import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseComponent} from './base/base.component';
import {CandidatesComponent} from './candidates/candidates/candidates.component';
import {VacanciesComponent} from './vacancies/vacancies/vacancies.component';
import {InterviewComponent} from './interview/interview/interview.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {EventComponent} from "./event/event/event.component";
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'event/:id', component: EventComponent},
      {path: 'interview', component: InterviewComponent},
      {path: 'vacancies', component: VacanciesComponent},
      {path: 'candidates/:vacancy', component: CandidatesComponent},
      {path: 'candidates', component: CandidatesComponent},
      {path: 'cabinet', component: CabinetComponent},
      {path: '', redirectTo: '/interview', pathMatch: 'full' },
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
}
