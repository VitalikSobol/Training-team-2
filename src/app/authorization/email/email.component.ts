import {Component, OnInit} from '@angular/core';
import {PasswordService} from '../../service/password/password.service';
import {AlertService} from '../../service/alert/alert.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css',
    '../../../assets/css/form_styles.css'],
  providers: [PasswordService, AlertService]
})
export class EmailComponent implements OnInit {

  isSuccess: boolean = false;

  email: string = '';

  constructor(private passwordService: PasswordService,
              public alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.clear();
  }

  closeAlert(alert: string): void {
    this.alertService.closeAlert(alert);
  }

  sendInstruction(email: string): void {
    this.passwordService.sendInstruction(email).subscribe(
      response => this.isSuccess = true,
      error => this.alertService.add(error.error.message));
  }

}
