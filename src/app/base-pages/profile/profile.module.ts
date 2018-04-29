import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProfileComponent} from './profile/profile.component';
import {DropdowsStatusComponent} from './dropdown-status/dropdown-status.component';
import {RouterModule} from '@angular/router';
import {CandidateService} from '../service/candidate/candidate.service';
import {SkillModalComponent} from './skill-modal/skill-modal.component';
import {ExperienceModalComponent} from './experience-modal/experience-modal.component';
import {ReviewModalComponent} from './review-modal/review-modal.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    DropdowsStatusComponent,
    SkillModalComponent,
    ExperienceModalComponent,
    ReviewModalComponent
  ],
  providers: [
    CandidateService
  ]
})
export class ProfileModule {
}
