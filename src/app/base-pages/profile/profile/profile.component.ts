import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CandidateService} from '../../../service/candidate/candidate.service';

import {Candidate} from '../../../service/candidate/candidate';
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
  dropdownSettings = {};

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private candidateService: CandidateService,
              private route: ActivatedRoute) {
    this.route.params.subscribe( params =>this.getCandidate(params.id));
  }

  ngOnInit() {
    this.getCandidate(this.id);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getCandidate(id: number) {
    this.candidateService.getCandidate(id).subscribe(
      (data:Candidate) => this.user = data,
      error => console.log(error),
      ()=>this.id = id);
  }

  saveChanges() {
    this.candidateService.updateCandidate(this.id, this.user).subscribe(
      ()=> this.changeMode(),
      error => console.log(error));
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  updateFromChild($event) {
    this.user.status = $event;
  }

  updateInformation():void {
    this.getCandidate(this.id);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
