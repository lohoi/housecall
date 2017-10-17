import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDescriptionComponent } from './patient-description.component';

describe('PatientDescriptionComponent', () => {
  let component: PatientDescriptionComponent;
  let fixture: ComponentFixture<PatientDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
