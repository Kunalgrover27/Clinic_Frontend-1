import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClinicsComponent } from './view-clinics.component';

describe('ViewClinicsComponent', () => {
  let component: ViewClinicsComponent;
  let fixture: ComponentFixture<ViewClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClinicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
