import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-status',
  templateUrl: './dropdown-status.component.html',
  styleUrls: ['./dropdown-status.component.css']
})
export class DropdowsStatusComponent {
  @Input()
  status: String = " ";
}
