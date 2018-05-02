import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Candidate} from './candidate';
import {CandidateBase} from './candidateBase';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Experience} from './experience';
import {FilterCandidates} from "./filterCandidates";

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) {
  }

  getCandidate(id: number): Observable<Candidate> {
    const url = `candidates/${id}`;
    return this.http.get<Candidate>(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  updateCandidate(id: number, user: Candidate) {
    const url = `candidates/${id}`;
    return this.http.put(url, JSON.stringify(user));
  }

  addSkill(id: number, nameSkill: String) {
    const url = `candidates/skill/${id}`;
    return this.http.post(url, nameSkill);
  }

  addExperience(id: number, experience: Experience) {
    const url = `candidates/experience/${id}`;
    return this.http.post(url, JSON.stringify(experience));
  }

  getReviews(id: number) {
    const url = `candidates/review/${id}`;
    return this.http.get(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addReview(id: number, content: String) {
    const url = `candidates/review/${id}`;
    return this.http.post(url, content);
  }

  getCandidates(filter:FilterCandidates, pagination): Observable<CandidateBase>{
    const url = `candidates`;
    let httpParams = new HttpParams()
      .set('name', filter.name)
      .set('position', filter.position)
      .set('date', filter.date)
      .set('status', filter.status)
      .set('email', filter.email)
      .set('rows', pagination.rows)
      .set('begin', pagination.begin)
      .set('page', pagination.page);

    return this.http.get<CandidateBase>(url, {params : httpParams})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}

