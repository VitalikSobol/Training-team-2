import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '../common/components/footer/footer.component';
import {CandidatesComponent} from './candidates/candidates.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CandidatesComponent}
    ])
  ],
  declarations: [
    CandidatesComponent,
    FooterComponent
  ]
})
export class CandidatesModule {
}
