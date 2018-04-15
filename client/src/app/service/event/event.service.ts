import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Event} from '../event/event'

import 'rxjs/add/observable/of';

@Injectable()
export class EventService {
  public getEvents(): Observable<Event[]>{
    let events: Event[] = [
      {
        id: 1,
        title: 'First Event',
        start: '2018-04-17T18:00:00',
        end: '2018-04-17T19:00:00'
      },
      {
        id: 2,
        title: 'Second Event',
        start: '2018-04-17T18:00:00',
        end: '2018-04-17T19:00:00'
      },
      {
        id: 3,
        title: 'Third Event',
        start: '2018-04-18T18:00:00',
        end: '2018-04-18T19:00:00'
      }
    ];
    return Observable.of(events);
  }
}
