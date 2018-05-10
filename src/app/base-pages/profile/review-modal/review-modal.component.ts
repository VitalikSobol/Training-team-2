import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../service/candidate/candidate';
import {CandidateService} from '../../../service/candidate/candidate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css'],
  providers: [CandidateService]
})
export class ReviewModalComponent implements OnInit {

  @Input()
  refModal: BsModalRef;

  @Input()
  user: Candidate;

  review: string = '';

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
    if (content.trim() != '')
      this.candidateService.addReview(this.id, content).subscribe(
        data => this.getReviews(),
        error => console.log(error),
        () => this.clearReviewField());
  }

  clearReviewField() {
    this.review = '';
  }
}
