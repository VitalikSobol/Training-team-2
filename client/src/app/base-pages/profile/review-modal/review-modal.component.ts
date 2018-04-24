import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../service/candidate/candidate';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {

  @Input()
  refModal = " ";

  @Input()
  user:Candidate;

  constructor() { }

  ngOnInit() {
  }

}
