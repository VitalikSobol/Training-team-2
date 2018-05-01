import {Component, OnInit} from '@angular/core';

import {Candidate} from './candidate';
import {CandidateService} from '../../service/candidate/candidate.service';
import {FilterCandidates} from "../../service/candidate/filterCandidates";
import {Pagination} from "../../common/components/footer/pagination";

@Component({
  moduleId: module.id,
  selector: 'app-candidates',
  templateUrl: 'candidates.component.html',
  styleUrls: ['candidates.component.css'],
  providers: [CandidateService]
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[] = [];
  total:number;
  range:string;

  filter: FilterCandidates = {
    name:'',
    position:'',
    date:'',
    status:'',
    email:''
  }

  pagination: Pagination = {
    rows: 10,
    begin: 0,
    page: 1
  }


  constructor( private candidateService: CandidateService) {
  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates(){
      this.candidateService.getCandidates(this.filter, this.pagination).subscribe((data: any) => {
      console.log(data);
      this.candidates = data.data;
      this.total = data.total;
      this.range = data.range;
     });
    }

  filtering(id,filterValue){
    this.filter[id] = filterValue;
    this.pagination.page = 1;
    this.pagination.begin = 0;
    this.getCandidates();
  }

  changeRowsNumber(numberRows){
    this.pagination.rows = +numberRows;
    this.pagination.page = 1;
    this.pagination.begin = 0;
    this.getCandidates();
  }

  goToPage(classDirection){
    if(classDirection == "button-next" && this.hasNext()){
      this.pagination.begin += this.pagination.rows;
      this.pagination.page += 1;
      console.log(this.pagination);
      this.getCandidates();
    }

    if(classDirection == "button-prev" && this.hasPrevious()){
      this.pagination.begin -= this.pagination.rows;
      this.pagination.page -= 1;
      console.log(this.pagination);
      this.getCandidates();
    }
  }

  hasNext(){
    return this.total - this.pagination.rows - this.pagination.begin > 0;
  }

  hasPrevious(){
    return this.pagination.begin - this.pagination.rows >= 0;
  }
}
