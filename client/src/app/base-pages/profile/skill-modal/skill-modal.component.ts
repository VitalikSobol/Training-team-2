import {Component, Input, OnInit} from '@angular/core';
import {CandidateService} from '../../service/candidate/candidate.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css'],
  providers: [CandidateService]
})
export class SkillModalComponent implements OnInit {

  @Input()
  refModal = '';

  nameSkill: String = '';

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  addSkill() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.candidateService.addSkill(id, this.nameSkill).subscribe(
      error => console.log(error));
    console.log(this.nameSkill);
  }

}
