import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Event} from './event';

import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) {
  }

  public getEvents(): Observable<Event[]> {
    const url = `/events`;
    return this.http.get<Event>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}
