import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseRoutingModule} from './base-routing.module';

import {MenuComponent} from './common/components/menu/menu.component';
import {NotificationBlockComponent} from './common/components/notification-block/notification-block.component';
import {SearchInputComponent} from './common/components/search-input/search-input.component';
import {BaseComponent} from './base/base.component';
import {FormsModule} from '@angular/forms';
import {FooterComponent} from './common/components/footer/footer.component';
import {VacanciesModule} from './vacancies/vacancies.module';
import {CandidatesModule} from './candidates/candidates.module';
import {ProfileModule} from './profile/profile.module';
import {InterviewModule} from './interview/interview.module';
import {VacanciesComponent} from './vacancies/vacancies/vacancies.component';
import {CandidatesComponent} from './candidates/candidates/candidates.component';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    FormsModule,
    VacanciesModule,
    CandidatesModule,
    ProfileModule,
    InterviewModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    BaseComponent,
    MenuComponent,
    NotificationBlockComponent,
    SearchInputComponent,
    FooterComponent,
    VacanciesComponent,
    CandidatesComponent
  ]
})
export class BaseModule {
}
