import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {EventService} from "../event/event.service";
import {Event} from "../event/event"

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css', ]
})
export class InterviewComponent implements OnInit {
  calendarOptions: Options;
  events: Event [];

  @ViewChild(CalendarComponent) interviewCalendar: CalendarComponent;
  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  ngOnInit() {
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
      height: "auto",
      weekends: false,
      events: this.events
    };

  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

}
