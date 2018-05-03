import {Component, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';

import {Vacancies} from './vacancies';
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {VacanciesService} from "../../service/vacancies/vacancies.service";
import {FilterVacancies} from "../../service/vacancies/filterVacancies";
import { Pagination} from "../../common/components/footer/pagination";

@Component({
  moduleId: module.id,
  selector: 'app-vacancies',
  templateUrl: 'vacancies.component.html',
  styleUrls: ['vacancies.component.css']
})

export class VacanciesComponent implements OnInit {
  // item: Vacancies;
  items: Vacancies[] = [];
  vacancies = {};
  isEdit: boolean = false;

  total:number;
  range:string;

  filter: FilterVacancies = {
    position:  '',
    description: '',
    salary: '',
  }

  pagination: Pagination = {
    rows: 10,
    begin: 0,
    page:1
  }

  @ViewChild("vacancyColumns")
    numberColumns: ElementRef;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private vacanciesService: VacanciesService,
  ) {
  }

  ngOnInit() {
    this.getVacancies();
    this.numberColumns = this.numberColumns.nativeElement.childElementCount;
  }


  getVacancies() {
    this.vacanciesService.getVacancies(this.filter, this.pagination).subscribe((data: any) => {
      this.items = data.data;
      this.total = data.total;
      this.range = data.range;
    });
  }

  filtering(id,filterValue){
    this.filter[id]=filterValue;
    this.pagination.page = 1;
    this.pagination.begin = 0;
    this.getVacancies();
  }

  changeRowsNumber(numberRows){
    this.pagination.rows = +numberRows;
    this.pagination.page = 1;
    this.pagination.begin = 0;
    this.getVacancies();
  }

  goToPage(classDirection){
    if(classDirection == "button-next" && this.hasNext()){
      this.pagination.begin += this.pagination.rows;
      this.pagination.page += 1;
      this.getVacancies();
    }

    if(classDirection == "button-prev" && this.hasPrevious()){
      this.pagination.begin -= this.pagination.rows;
      this.pagination.page -= 1;
      this.getVacancies();
    }
  }

  hasNext(){
    return this.total - this.pagination.rows - this.pagination.begin > 0;
  }

  hasPrevious(){
    return this.pagination.begin - this.pagination.rows >= 0;
  }

  addVacancies(vacancies) {
    this.vacanciesService.addVacancies(vacancies).subscribe(
      error => console.log(error));
    this.items.unshift(vacancies);
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  // saveChanges(item) {
  //   this.vacanciesService.updateVacancy(item).subscribe(
  //     error => console.log(error));
  //   console.log(item);
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  notFound(){
    return !this.total;
  }

}
