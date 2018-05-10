import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesService} from '../../service/vacancies/vacancies.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [VacanciesService]
})
export class VacanciesModule {
}
