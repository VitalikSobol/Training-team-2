import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddModalComponent } from './event-add-modal.component';

describe('EventAddModalComponent', () => {
  let component: EventAddModalComponent;
  let fixture: ComponentFixture<EventAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
