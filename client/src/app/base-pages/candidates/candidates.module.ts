import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CandidateService} from '../service/candidate/candidate.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[CandidateService]
})
export class CandidatesModule {
}
