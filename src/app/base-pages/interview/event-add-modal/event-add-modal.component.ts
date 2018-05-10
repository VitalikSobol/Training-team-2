import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {EventService} from "../../../service/event/event.service";


export class NewEvent{
    id: number;
    start: any;
    end: any;
    title: string;
    interviewers: number[];
    candidates: number[];
    allDay: boolean;
    description: string;
    place: string;
    color: string;
}

@Component({
  selector: 'app-event-add-modal',
  templateUrl: './event-add-modal.component.html',
  styleUrls: ['./event-add-modal.component.css'],
  providers: [EventService]
})
export class EventAddModalComponent implements OnInit {

  @Input()
  dateEvent: String;

  @Input()
  refModal = "";

  @Output()
  renderEvent: EventEmitter<object> = new EventEmitter<object>();

  newEvent = new NewEvent();

  timeShow: boolean = false;
  timeStartEvent: string = '08:00';
  timeEndEvent: string = '09:00';

  candidatesForInterview: string[];
  allInterviewers: string[];
  showCandidate: boolean = true;
  showInterviewer: boolean = true;
  isViewCandidates: boolean = false;
  isViewInterviewers: boolean = false;

  otherOptionsView: boolean = true;
  colorEvent: string = 'green';
  idColorEvent: string = '02C39A';

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.newEvent.start = this.dateEvent;
    this.loadCandidatesForInterview();
    this.loadAllInterviewers();
  }

  selectTime(){
    this.timeShow = !this.timeShow;
  }

  onSubmit(newEventForm){
    if(!this.newEvent.title){this.newEvent.title = ''}
    this.newEvent.end = this.newEvent.start;
    this.newEvent.start += " " + this.timeStartEvent;
    this.newEvent.end  += " " + this.timeEndEvent;
    this.chooseCandidates(newEventForm.value);
    this.chooseInterviewers(newEventForm.value);
    if(!this.newEvent.place){this.newEvent.place = ''}
    this.newEvent.color = '#' + this.idColorEvent;
    if(!this.newEvent.description){this.newEvent.description = ''}
    this.createNewEvent();
  }

  rightTime(){
    return this.timeStartEvent >= this.timeEndEvent;
  }

  showCandidates(){
    this.showCandidate = !this.showCandidate;
  }

  showInterviewers(){
    this.showInterviewer = !this.showInterviewer;
  }

  viewAllCandidates(){
    this.isViewCandidates = !this.isViewCandidates;
  }

  viewAllInterviewers(){
    this.isViewInterviewers = !this.isViewInterviewers;
  }

  loadCandidatesForInterview() {
    this.eventService.getCandidatesForInterview().subscribe((data: any) => {
      this.candidatesForInterview = data.data;
    });
  }

  chooseCandidates(formObject){
    let allCandidates = formObject.selectCandidates;
    let idArraySelectCandidates = [];
    for (let idSelectedCandidate in allCandidates){
      if(allCandidates[idSelectedCandidate] === true){
        idArraySelectCandidates.push(+idSelectedCandidate);
      }
    }
    this.newEvent.candidates = idArraySelectCandidates;
  }

  loadAllInterviewers(){
    this.eventService.getAllInterviewers().subscribe((data: any) => {
      this.allInterviewers = data.data;
    });
  }

  chooseInterviewers(formObject){
    let allInterviewers = formObject.selectInterviewers;
    let idArraySelectInterviewers = [];
    for (let idSelectInterviewer in allInterviewers){
      if(allInterviewers[idSelectInterviewer] === true){
        idArraySelectInterviewers.push(+idSelectInterviewer.substr(0,idSelectInterviewer.length - 11));
      }
    }
    this.newEvent.interviewers = idArraySelectInterviewers;
  }

  showOtherOptions(){
    this.otherOptionsView = !this.otherOptionsView;
  }

  setColorEvent(event){
    this.colorEvent = event.target.className;
    this.idColorEvent = event.target.id;
  }

  createNewEvent(){
    this.eventService.createEvent(this.newEvent).subscribe((data: any) => {
      this.newEvent.id = data.result;
      this.renderEvent.emit(this.newEvent);
      this.newEvent = new NewEvent();
    });
  }
}
