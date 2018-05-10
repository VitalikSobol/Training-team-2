import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandidateService} from '../../../service/candidate/candidate.service';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {IDatePickerConfig} from 'ng2-date-picker';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {Experience} from '../../../service/candidate/experience';

@Component({
  moduleId: module.id,
  selector: 'app-experience-modal',
  templateUrl: 'experience-modal.component.html',
  styleUrls: ['experience-modal.component.css'],
  providers: [CandidateService]
})
export class ExperienceModalComponent implements OnInit {

  datePickerConfig = {
    format: 'MMM YYYY',
    openOnFocus: false
  };

  @Input()
  refModal: BsModalRef;

  experience={};

  @Output()
  saveExperience: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  addExperience(experience) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.candidateService.addExperience(id, experience).subscribe(
      data => this.saveExperience.emit(this.experience),
      error => console.log(error));
  }

}
