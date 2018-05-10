import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skill} from '../../../service/candidate/skill';
import {CandidateService} from '../../../service/candidate/candidate.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers: [CandidateService]
})
export class SkillsComponent implements OnInit {

  @Input()
  skills: Skill[];

  @Input()
  isEdit: boolean;

  @Output()
  removeSkill: EventEmitter<Skill> = new EventEmitter<Skill>();

  constructor(private candidateService: CandidateService) {
  }

  ngOnInit() {
  }

  deleteSkill(skill: Skill) {
    this.candidateService.deleteSkill(skill.id).subscribe(
      data => this.skills.splice(this.skills.indexOf(skill),1),
      error => console.log(error));
  }

  editSkill(skill: Skill) {
    this.candidateService.editSkill(skill).subscribe(
      data => skill.edit = false,
      error => console.log(error));
  }

  setEditMode(skill: Skill) {
    skill.edit = true;
  }

}
