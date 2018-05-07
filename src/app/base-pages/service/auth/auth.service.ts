import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registration(user: User) {
    const url = `registration`;
    return this.http.post(url, JSON.stringify(user), {observe: 'response'})
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  login(user:User) {
    const url = `login`;
    return this.http.post(url, JSON.stringify(user), {observe: 'response'})
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  setAuthorizationToken(token: string):void {
    localStorage.setItem('User', token);
  }

  removeAuthorizationToken():void {
    localStorage.removeItem('User');
  }

}
