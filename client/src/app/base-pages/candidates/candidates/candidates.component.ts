import {Component, OnInit} from '@angular/core';

import {Candidate} from './candidate';
import {CandidateService} from '../../service/candidate/candidate.service';
import {Filter} from "../../service/candidate/filter";

@Component({
  moduleId: module.id,
  selector: 'app-candidates',
  templateUrl: 'candidates.component.html',
  styleUrls: ['candidates.component.css'],
  providers: [CandidateService]
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[] = [];
  filter: Filter = {
    name:'',
    position:'',
    date:'',
    status:'',
    email:''
  }

  pagination = {
    rows:10,
    begin:0,
    page:1
  }

  //total:number;
  //range:string;
  //currentRows: number = 10;

  constructor( private candidateService: CandidateService) {
  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates(){
      this.candidateService.getCandidates(this.filter, this.pagination).subscribe((data: any) => {
      console.log(data);
      this.candidates = data.data;
      //this.total = data.total;
      //this.range = data.range;
     });
    }

  filtering(id,filterValue){
    this.filter[id] = filterValue;
    this.getCandidates();
  }

  /*changeRowsNumber($event){
    this.currentRows = $event;
    console.log($event);
  }*/
}
