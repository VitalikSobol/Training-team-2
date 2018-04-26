import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable";
import  {HttpClient, } from "@angular/common/http";
import {Vacancies} from "./vacancies";

@Injectable()
export class VacanciesService {

  constructor(private http: HttpClient ) { }

  getVacancies(): Observable<Vacancies>{
    const url = `vacancies`;
    return this.http.get<Vacancies>(url);
  }
}
