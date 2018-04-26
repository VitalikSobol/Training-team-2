import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {EventService} from '../../service/event/event.service';
import {Event} from '../../service/event/event';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  providers: [EventService]
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  events: Event [];
  modalRef: BsModalRef;
  dateEvent: String;

  @ViewChild(CalendarComponent) interviewCalendar: CalendarComponent;

  constructor(private eventService: EventService, private modalService: BsModalService) {
    this.loadEvents();
  }

  ngOnInit() {
    this.loadEvents();
    this.setSettings();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  setDateEvent (event) {
    this.dateEvent = new Date(event.detail.date._d).toISOString().substr(0,10);

  }

  setSettings() {
    this.calendarOptions = {
      minTime: '08:00:00',
      maxTime: '17:00:00',
      timezone: 'local',
      slotLabelFormat: 'h(:mm)a',
      buttonText: {
        month: 'month',
        week: 'week',
        day: 'day',
        list: 'schedule',
      },
      header: {
        left: 'prev,next, today',
        right: 'agendaDay, agendaWeek, month, list',
        center: 'title'
      },
      firstDay: 1,
      theme: false,
      height: 'auto',
      weekends: false,
      events: this.eventService.getEvents().subscribe((data: Event[]) => {
        this.events = data;
      })
    };
  }

}
