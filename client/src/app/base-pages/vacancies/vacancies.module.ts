import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {FooterComponent} from '../common/components/footer/footer.component';
import {RouterModule} from '@angular/router';

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
  bootstrap: [
    VacanciesComponent
  ]
})
export class VacanciesModule {
}
