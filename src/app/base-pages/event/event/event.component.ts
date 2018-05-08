import {Component, OnInit} from '@angular/core';
import {EventService} from "../../service/event/event.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";
/*import {Event} from './event'*/

export class Event{
  id: number;
  start: any;
  end: any;
  title: string;
  description: string;
  place: string;
  color: string;
}


export enum Color {
  'D90429' = 'red',
  '1D3557' = 'blue',
  '02C39A' = 'green',
  '7B506F' = 'lavender',
  '47040B' = 'brown'
}

@Component({
  moduleId: module.id,
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css'],
  providers: [EventService]
})

export class EventComponent implements OnInit{

  currentEvent: Event = new Event()

  currentCandidates: string[];
  currentUsers: string[];

  timeStartEvent: string;
  timeEndEvent: string;

  colorEvent;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.getEventById();
  }

  getEventById(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEventById(id).subscribe((data: any) => {
      this.parseDate(data.data);
      this.currentEvent = data.data;
      this.currentCandidates = data.candidates;
      this.currentUsers = data.users;
      this.colorEvent = Color[data.data.color.substring(1)];
      console.log(this.currentEvent)
    });
  }

  updateEventById(){
    this.eventService.updateEventById(this.currentEvent).subscribe();
    this.router.navigate(['interview']);
  }


  parseDate(objectEvent){
    this.timeStartEvent = objectEvent.start.substring(11,16);
    this.timeEndEvent = objectEvent.end.substring(11,16);
    objectEvent.start = objectEvent.start.substring(0,10);
    objectEvent.end = objectEvent.end.substring(0,10);

  }

  onSubmit(){
    this.currentEvent.end = this.currentEvent.start;
    this.currentEvent.start += " " + this.timeStartEvent;
    this.currentEvent.end  += " " + this.timeEndEvent;
    this.updateEventById();
    console.log(this.currentEvent);
  }

  rightTime(){
    return this.timeStartEvent >= this.timeEndEvent;
  }

  setColorEvent(event){
    this.currentEvent.color = '#' + event.target.id;
    this.colorEvent = Color[this.currentEvent.color.substring(1)];
  }
}


