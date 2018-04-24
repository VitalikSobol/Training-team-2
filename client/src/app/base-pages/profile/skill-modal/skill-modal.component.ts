import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css']
})
export class SkillModalComponent implements OnInit {

  @Input()
  refModal = " ";

  constructor() { }

  ngOnInit() {
  }

}
