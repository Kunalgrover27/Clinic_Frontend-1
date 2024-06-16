import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseClinicComponent } from './disease-clinic.component';

describe('DiseaseClinicComponent', () => {
  let component: DiseaseClinicComponent;
  let fixture: ComponentFixture<DiseaseClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseClinicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
