import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {VacanciesService} from "../../service/vacancies/vacancies.service";

import {Vacancies} from './vacancies';
// import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-vacancies',
  templateUrl: 'vacancies.component.html',
  styleUrls: ['vacancies.component.css']
})

export class VacanciesComponent implements OnInit {

  items : Vacancies[];
  vacancies = {};
  isEdit: boolean = false;

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
      this.items = data.data
    });
  }

  addVacancies(vacancies) {
    this.vacanciesService.addVacancies(vacancies).subscribe(
      error => console.log(error));
    this.items.unshift(vacancies);
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  // saveChanges() {
  //   this.vacanciesService.updateVacancy(this.item).subscribe(
  //     error => console.log(error));
  // }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
