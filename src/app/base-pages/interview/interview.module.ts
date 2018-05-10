import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InterviewComponent} from './interview/interview.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {EventService} from '../../service/event/event.service';
import { EventAddModalComponent } from './event-add-modal/event-add-modal.component';
import { TimepickerModule } from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot()
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
