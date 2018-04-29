import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable";
import  {HttpClient, } from "@angular/common/http";
import {Vacancies} from "./vacancies";
import {Candidate} from "../candidate/candidate";

@Injectable()
export class VacanciesService {

  constructor(private http: HttpClient ) { }

  getVacancies(): Observable<Vacancies>{
    const url = `vacancies`;
    return this.http.get<Vacancies>(url);
  }

  addVacancies(vacancies: Vacancies){
    const url =`vacancies`;
    return this.http.post(url,JSON.stringify(vacancies))
  }
  updateVacancy(item: Vacancies) {
    const url = `vacancies`;
    return this.http.put(url, JSON.stringify(item));
  }
//   getFilter(filter.position:string, filter.description:string, filter.salary:number ):Observable<Vacancies>{
//     const url=`Vacancies?filter.position=${filter.position}&filter.description=${filter.description}&filter.salary=${filter.salary}}`
//     return this.http.
//   }
}
