import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-add-modal',
  templateUrl: './event-add-modal.component.html',
  styleUrls: ['./event-add-modal.component.css']
})
export class EventAddModalComponent implements OnInit {

  @Input()
  dateEvent: String;

  @Input()
  refModal = "";

  constructor() { }

  ngOnInit() {
  }

}
