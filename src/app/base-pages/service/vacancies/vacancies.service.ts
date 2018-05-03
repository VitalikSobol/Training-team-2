import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable";
import  {HttpClient, HttpParams } from "@angular/common/http";
import {Vacancies} from "./vacancies";
import {Candidate} from "../candidate/candidate";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {FilterVacancies} from "./filterVacancies";

@Injectable()
export class VacanciesService {

  constructor(private http: HttpClient ) { }

  getVacancies(filter:FilterVacancies, pagination): Observable<Vacancies>{
    const url = `vacancies`;
    let httpParams = new HttpParams()
      .set('position', filter.position)
      .set('description', filter.description)
      .set('salary', filter.salary)
      .set('rows', pagination.rows)
      .set('begin', pagination.begin)
      .set('page',pagination.page);

    return this.http.get<Vacancies>(url, {params : httpParams})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addVacancies(vacancies: Vacancies){
    const url =`vacancies`;
    return this.http.post(url,JSON.stringify(vacancies))
  }
  updateVacancy(item: Vacancies) {
    const url = `vacancies`;
    return this.http.put(url, JSON.stringify(item));
  }
}
