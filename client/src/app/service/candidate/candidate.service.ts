import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Candidate} from './candidate';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidate(id: number): Observable<Candidate> {
    const url = `candidates/${id}`;
    console.log(this.http.get<Candidate>(url));
    return this.http.get<Candidate>(url);
  }
}
