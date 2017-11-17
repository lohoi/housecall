import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDescripComponent } from './patient-descrip.component';

describe('PatientDescripComponent', () => {
  let component: PatientDescripComponent;
  let fixture: ComponentFixture<PatientDescripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDescripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDescripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
