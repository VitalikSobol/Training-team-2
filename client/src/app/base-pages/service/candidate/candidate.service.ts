import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Candidate} from './candidate';
import {CandidateBase} from './candidateBase';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Experience} from './experience';

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

  getCandidates(): Observable<CandidateBase>{
    const url = `candidates`;
    return this.http.get<CandidateBase>(url);
  }
}
