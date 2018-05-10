import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Candidate} from './candidate';
import {CandidateBase} from './candidateBase';
import {NewCandidate} from './newCandidate';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Experience} from './experience';
import {FilterCandidates} from './filterCandidates';
import {Skill} from './skill';

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
    return this.http.put(url, JSON.stringify(user))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addSkill(id: number, nameSkill: String) {
    const url = `candidates/skill/${id}`;
    return this.http.post(url, nameSkill)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addExperience(id: number, experience: Experience) {
    const url = `candidates/experience/${id}`;
    return this.http.post(url, JSON.stringify(experience))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
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
    let token = localStorage.getItem("User");

    return this.http.post(url, content, {headers:new HttpHeaders({'Authorization': token})})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  getCandidates(filter: FilterCandidates, pagination): Observable<CandidateBase> {
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

    return this.http.get<CandidateBase>(url, {params: httpParams})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addCandidate(newCandidate: NewCandidate, selectedVacancy: string[]) {
    const url = `candidates`;
    let candidate = {
      'newCandidate': newCandidate,
      'vacancies': selectedVacancy
    };

    return this.http.post(url, JSON.stringify(candidate))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  deleteSkill(id: number) {
    const url = `candidates/skill/${id}`;
    return this.http.delete(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  editSkill(skill: Skill) {
    const url = `candidates/skill/${skill.id}`;
    return this.http.put(url, JSON.stringify(skill))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  deleteExperience(id: number) {
    const url = `candidates/experience/${id}`;
    return this.http.delete(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  editExperience(experience: Experience) {
    const url = `candidates/experience/${experience.id}`;
    return this.http.put(url, JSON.stringify(experience))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }
}

