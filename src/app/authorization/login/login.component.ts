import {Component, OnInit} from '@angular/core';
import {User} from '../../service/auth/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/css/form_styles.css'],
  providers: [AuthService, AlertService]
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              public alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.clear();
  }

  login(user: User): void {
    this.authService.login(user).subscribe(
      response => this.authService.setAuthorizationToken(response.headers.get('Authorization')),
      error => this.alertService.add(error.error.message),
      () => this.router.navigate(['/candidates']));
  }

  closeAlert(alert: string): void {
    this.alertService.closeAlert(alert);
  }

}
