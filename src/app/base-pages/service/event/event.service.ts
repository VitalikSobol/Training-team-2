import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Event} from './event';

import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Skill} from "../candidate/skill";

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

  public getCandidatesForInterview(){
    const url = `/interviewee`;
    return this.http.get<string[]>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  public getAllInterviewers(){
    const url = `/interviewers`;
    return this.http.get<string[]>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  public createEvent(newEvent){
    const url = `/events`;
    return this.http.post(url, JSON.stringify(newEvent));
  }

  public getEventById(id:number){
    const url = `events/${id}`;
    return this.http.get(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  public updateEventById(editEvent){
    const url = `events/${editEvent.id}`;
    return this.http.put(url, JSON.stringify(editEvent))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

}
