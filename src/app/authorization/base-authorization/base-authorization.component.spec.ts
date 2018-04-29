import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthorizationComponent } from './base-authorization.component';

describe('BaseAuthorizationComponent', () => {
  let component: BaseAuthorizationComponent;
  let fixture: ComponentFixture<BaseAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
