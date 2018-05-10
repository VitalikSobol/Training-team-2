import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../service/alert/alert.service';
import {PasswordService} from '../../service/password/password.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css',
    '../../../assets/css/form_styles.css'],
  providers: [AlertService, PasswordService]
})
export class PasswordComponent implements OnInit {

  password: string = '';
  confirmPassword: string = '';
  token: string = '';

  constructor(private passwordService: PasswordService,
              public alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  setPassword(password: string):void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.passwordService.setPassword(password, this.token).subscribe(
      response => this.router.navigate(['/auth/login']),
      error => this.alertService.add(error.error.message));
  }

  closeAlert(alert: string): void {

    this.alertService.closeAlert(alert);
  }
}
