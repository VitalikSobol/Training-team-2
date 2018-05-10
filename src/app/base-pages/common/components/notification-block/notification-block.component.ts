import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../service/notification/notification.service';
import {NotificationEvent} from '../../../../service/notification/notification-event';
import {NotificationCandidate} from '../../../../service/notification/notification-candidate';

@Component({
  selector: 'app-notification-block',
  templateUrl: './notification-block.component.html',
  styleUrls: ['./notification-block.component.css'],
  providers: [NotificationService]
})
export class NotificationBlockComponent implements OnInit{

  events:NotificationEvent[];
  candidates:NotificationCandidate[];

  isAllCandidates: boolean = false;
  isAllEvents: boolean = false;
  isEvents: boolean = true;
  isCandidates: boolean = true;

  ngOnInit(): void {
    this.getEvents();
    this.getNewCandidates();
  }

  constructor(private notificationService: NotificationService) {
  }

  getEvents() {
    this.notificationService.getEventsNotification().subscribe(
      (data:NotificationEvent[])=>this.events = data);
  }

  getNewCandidates() {
    this.notificationService.getCandidatesNotification().subscribe(
      (data:NotificationCandidate[])=>this.candidates = data["data"]);
    console.log(this.candidates);
  }
}
