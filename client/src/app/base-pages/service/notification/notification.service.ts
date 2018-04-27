import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {NotificationEvent} from './notification-event';
import {NotificationCandidate} from './notification-candidate';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) { }

  getEventsNotification(): Observable<NotificationEvent[]> {
    const url = `/notification`;
    return this.http.get<NotificationEvent>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  getCandidatesNotification(): Observable<NotificationCandidate[]> {
    const url = `/candidates/status/New`;
    return this.http.get<NotificationCandidate>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

}
