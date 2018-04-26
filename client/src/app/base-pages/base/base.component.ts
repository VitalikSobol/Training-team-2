import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent{
  isVisibleNotification: boolean = false;

  changeShowStatus() {
    this.isVisibleNotification = !this.isVisibleNotification;
  }
}
