import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CandidateService} from '../../service/candidate/candidate.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule
  ],
  providers:[CandidateService]
})
export class CandidatesModule {
}
