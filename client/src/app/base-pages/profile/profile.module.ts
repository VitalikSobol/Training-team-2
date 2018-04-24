import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {DropdowsStatusComponent} from './dropdown-status/dropdown-status.component';
import {RouterModule} from '@angular/router';
import {CandidateService} from '../service/candidate/candidate.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SkillModalComponent} from './skill-modal/skill-modal.component';
import {ExperienceModalComponent} from './experience-modal/experience-modal.component';
import {ReviewModalComponent} from './review-modal/review-modal.component';
import {TabPanelComponent} from './tab-panel/tab-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ProfileComponent}
    ]),
    NgbModule
  ],
  declarations: [
    ProfileComponent,
    DropdowsStatusComponent,
    SkillModalComponent,
    ExperienceModalComponent,
    ReviewModalComponent,
    TabPanelComponent
  ],
  providers: [
    CandidateService
  ]
})
export class ProfileModule {
}
