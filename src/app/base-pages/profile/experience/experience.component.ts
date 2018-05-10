import {Component, Input, OnInit} from '@angular/core';
import {Experience} from '../../../service/candidate/experience';
import {CandidateService} from '../../../service/candidate/candidate.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  datePickerConfig = {
    format: 'MMM YYYY',
    openOnFocus: false
  };

  @Input()
  experiences: Experience[];

  @Input()
  isEdit: boolean;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }

  setEditMode(experience: Experience) {
    experience.edit = true;
  }

  editExperience(experience: Experience) {
    this.candidateService.editExperience(experience).subscribe(
      data => experience.edit = false,
      error => console.log(error));
  }

  deleteExperience(experience: Experience) {
    this.candidateService.deleteExperience(experience.id).subscribe(
      data => this.experiences.splice(this.experiences.indexOf(experience),1),
      error => console.log(error));
  }

}
