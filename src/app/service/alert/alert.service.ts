import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlertService {
  public alerts: string[] = [];

  add(alert: string) {
    this.alerts.push(alert);
  }

  clear() {
    this.alerts = [];
  }

  closeAlert(alert: string): void {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }


  constructor() { }

}
