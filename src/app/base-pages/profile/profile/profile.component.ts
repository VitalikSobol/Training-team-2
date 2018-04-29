import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CandidateService} from '../../service/candidate/candidate.service';

import {Candidate} from '../../service/candidate/candidate';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [CandidateService]
})
export class ProfileComponent implements OnInit {
  user: Candidate;
  id = +this.route.snapshot.paramMap.get('id');
  isEdit: boolean = false;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private candidateService: CandidateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCandidate();
  }

  getCandidate() {
    this.candidateService.getCandidate(this.id).subscribe(
      (data: Candidate) => this.user = data,
      error => console.log(error));
  }

  saveChanges() {
    this.candidateService.updateCandidate(this.id, this.user).subscribe(
      error => console.log(error));
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  updateFromChild($event) {
    this.user.status = $event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
