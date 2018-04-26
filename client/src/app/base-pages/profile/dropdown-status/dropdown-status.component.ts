import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-status',
  templateUrl: './dropdown-status.component.html',
  styleUrls: ['./dropdown-status.component.css']
})
export class DropdowsStatusComponent{
  @Input()
  status: String;

  @Output()
  change: EventEmitter<String> = new EventEmitter<String>();

  setStatus(event): void {
    this.status =  event.target.innerText;
    this.change.emit(this.status);
  }
}
