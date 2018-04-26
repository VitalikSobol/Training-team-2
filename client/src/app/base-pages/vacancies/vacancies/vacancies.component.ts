import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {VacanciesService} from "../../service/vacancies/vacancies.service";

import {Vacancies} from './vacancies';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})

export class VacanciesComponent implements OnInit {

  items = [];
  //Vacancies[] =
  //   [
  //     { vacancy: "Big Data Developer", description: "blabla", salary: 1500, candidates: "View Candidates" },
  //     { vacancy: "Senior Java Developer", description: "blabla", salary: 2000,candidates: "View Candidates" },
  //     { vacancy: "Senior Java Developer", description: "blabla", salary: 2000, candidates: "View Candidates"},
  //     { vacancy: "React Native Developer", description: "blabla", salary:3000, candidates: "View Candidates"},
  //     { vacancy: "React Native Developer", description: "blabla", salary:3000, candidates: "View Candidates"},
  //     { vacancy: "Big Data Developer", description: "blabla", salary:3000, candidates: "View Candidates"},
  //     { vacancy: "Big Data Developer", description: "blabla", salary:3000, candidates: "View Candidates"}
  //   ];

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private vacanciesService: VacanciesService,
              // private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getVacancies();
  }


  getVacancies() {
    this.vacanciesService.getVacancies().subscribe((data: any) => {
      // console.log(data.data);
      this.items = data.data
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
