import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Vacancies} from './vacancies';
import {Candidate} from '../candidate/candidate';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {FilterVacancies} from './filterVacancies';

@Injectable()
export class VacanciesService {

  constructor(private http: HttpClient) {
  }

  getVacancies(filter: FilterVacancies, pagination): Observable<Vacancies> {
    const url = `vacancies`;
    let httpParams = new HttpParams()
      .set('position', filter.position)
      .set('description', filter.description)
      .set('salary1', filter.salary1)
      .set('salary2', filter.salary2)
      .set('status', filter.status)
      .set('rows', pagination.rows)
      .set('begin', pagination.begin)
      .set('page', pagination.page);
    // console.log(httpParams);
    // console.log(filter);

    return this.http.get<Vacancies>(url, {params: httpParams})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  addVacancies(vacancies: Vacancies) {
    const url = `vacancies`;
    return this.http.post(url, JSON.stringify(vacancies));
  }

  updateVacancy(item: Vacancies) {
    const url = `vacancies`;
    return this.http.put(url, JSON.stringify(item));
  }

  editVacancy(item: Vacancies) {
    const url = `vacancies/${item.id}`;
    return this.http.put(url, JSON.stringify(item))
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  deleteVacancy(id: number) {
    const url = `vacancies/${id}`;
    return this.http.delete(url)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

}
