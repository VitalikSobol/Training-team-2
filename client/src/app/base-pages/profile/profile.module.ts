import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {DropdowsStatusComponent} from './dropdown-status/dropdown-status.component';
import {RouterModule} from '@angular/router';
import {CandidateService} from '../service/candidate/candidate.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ProfileComponent}
    ])
  ],
  declarations: [
    ProfileComponent,
    DropdowsStatusComponent
  ],
  providers: [
    CandidateService
  ]
})
export class ProfileModule {
}
