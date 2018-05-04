import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router) {
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
