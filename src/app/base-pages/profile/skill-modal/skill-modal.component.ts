import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandidateService} from '../../../service/candidate/candidate.service';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css'],
  providers: [CandidateService]
})
export class SkillModalComponent implements OnInit {

  @Input()
  refModal: BsModalRef;

  skill = {name: ''};

  @Output()
  saveSkill: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  addSkill() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.candidateService.addSkill(id, this.skill.name).subscribe(
      data => this.saveSkill.emit(this.skill),
      error => console.log(error));
  }

}
