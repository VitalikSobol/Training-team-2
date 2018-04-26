import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {InterviewComponent} from './interview/interview.component';
import {EventService} from './event/event.service';
import {FullCalendarModule} from 'ng-fullcalendar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: InterviewComponent}
    ]),
    FullCalendarModule
  ],
  declarations: [
    InterviewComponent
  ],
  providers: [
    EventService
  ]
})
export class InterviewModule { }
