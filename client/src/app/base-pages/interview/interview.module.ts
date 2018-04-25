import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {InterviewComponent} from './interview/interview.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {EventService} from './event/event.service';

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
