import {Injectable} from '@angular/core';
import {User} from '../auth/user';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  sendInstruction(email: string) {
    const url = `email`;
    return this.http.post(url, JSON.stringify({'email': email}))
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  setPassword(password: string, token: string) {
    const url = `password`;
    return this.http.post(url, JSON.stringify({"token": token, "password": password}))
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

}
