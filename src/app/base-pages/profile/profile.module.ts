import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProfileComponent} from './profile/profile.component';
import {DropdowsStatusComponent} from './dropdown-status/dropdown-status.component';
import {CandidateService} from '../../service/candidate/candidate.service';
import {SkillModalComponent} from './skill-modal/skill-modal.component';
import {ExperienceModalComponent} from './experience-modal/experience-modal.component';
import {ReviewModalComponent} from './review-modal/review-modal.component';
import {FormsModule} from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import {RouterModule} from '@angular/router';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    DpDatePickerModule,
    RouterModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    ProfileComponent,
    DropdowsStatusComponent,
    SkillModalComponent,
    ExperienceModalComponent,
    ReviewModalComponent,
    SkillsComponent,
    ExperienceComponent
  ],
  providers: [
    CandidateService
  ]
})
export class ProfileModule {
}
