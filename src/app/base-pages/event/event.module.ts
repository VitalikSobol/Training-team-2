import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from "./event/event.component"
import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule
  ],
  declarations: [
    EventComponent
  ]
})
export class EventModule {
}
