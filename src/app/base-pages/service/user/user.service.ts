import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInformation():Observable<User> {
    const url = `user`;
    let token = localStorage.getItem("User");

    return this.http.get<User>(url, {headers:new HttpHeaders({'Authorization': token})})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  updateUserInformation(user: User) {
      const url = `user/`+ user.id;
      return this.http.put(url, JSON.stringify(user))
        .catch((error: any) => {
          return Observable.throw(error);
        });
  }

}
