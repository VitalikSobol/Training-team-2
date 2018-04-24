import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit {

  @Input()
  refModal = " ";

  constructor() { }

  ngOnInit() {
  }

}
