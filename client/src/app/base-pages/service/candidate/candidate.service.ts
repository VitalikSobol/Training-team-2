import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Candidate} from './candidate';

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidate(id: number): Observable<Candidate> {
    const url = `candidates/${id}`;
    return this.http.get<Candidate>(url);
  }
}
