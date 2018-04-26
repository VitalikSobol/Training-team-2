import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {FooterComponent} from '../common/components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {VacanciesService} from "../service/vacancies/vacancies.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: VacanciesComponent}
    ])
  ],
  declarations: [
    VacanciesComponent,
    FooterComponent
  ],
  providers:[VacanciesService],
  bootstrap: [
    VacanciesComponent
  ]
})
export class VacanciesModule {
}
