import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../service/candidate/candidate';
import {CandidateService} from '../../service/candidate/candidate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css'],
  providers: [CandidateService]
})
export class ReviewModalComponent implements OnInit {

  @Input()
  refModal = ' ';

  @Input()
  user: Candidate;

  reviews = [];
  id = +this.route.snapshot.paramMap.get('id');

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.candidateService.getReviews(this.id).subscribe(
      data => this.reviews = data,
      error => console.log(error));
  }

  addReview(content: String) {
    this.candidateService.addReview(this.id, content).subscribe(
      error => console.log(error));
  }
}
