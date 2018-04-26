import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {InterviewComponent} from './interview/interview.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {EventService} from '../service/event/event.service';
import { EventAddModalComponent } from './event-add-modal/event-add-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: InterviewComponent}
    ]),
    FullCalendarModule
  ],
  declarations: [
    InterviewComponent,
    EventAddModalComponent
  ],
  providers: [
    EventService
  ]
})
export class InterviewModule { }
