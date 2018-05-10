import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [AuthService]
})
export class BaseComponent implements OnInit {

  isVisibleNotification: boolean = false;
  isVisibleMenu: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }


  ngOnInit(): void {
  }

  changeShowStatus():void {
    this.isVisibleNotification = !this.isVisibleNotification;
  }

  changeVisibleMenu():void {
    this.isVisibleMenu = !this.isVisibleMenu;
  }

  logout():void {
    this.authService.removeAuthorizationToken();
    this.router.navigate(['/auth/login']);
  }
}
