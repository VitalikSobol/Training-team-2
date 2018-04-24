import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CandidateService} from '../../service/candidate/candidate.service';

import {Candidate} from '../../service/candidate/candidate';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {};

  isEdit: boolean = false;

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCandidate();
  }

  getCandidate() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.candidateService.getCandidate(id).subscribe((data: Candidate) => this.user = data);
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
