import {Component, OnInit} from '@angular/core';
import {User} from '../../service/auth/user';
import {AuthService} from '../../service/auth/auth.service';
import {AlertService} from '../../service/alert/alert.service';
import {Router} from '@angular/router';
import {RegisterUser} from '../../service/auth/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
    '../../../assets/css/form_styles.css'],
  providers: [AuthService,
    AlertService]
})
export class RegisterComponent implements OnInit {

  user: RegisterUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private authService: AuthService,
              public alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.alertService.clear();
  }

  registration(user: User) {
    this.authService.registration(user).subscribe(
      response => this.authService.setAuthorizationToken(response.headers.get('Authorization')),
      error => this.alertService.add(error.error.message),
      () => this.router.navigate(['/candidates']));
  }

  closeAlert(alert: string): void {
    this.alertService.closeAlert(alert);
  }

}
