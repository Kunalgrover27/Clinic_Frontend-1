import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClinicDetailComponent } from './admin-clinic-detail.component';

describe('AdminClinicDetailComponent', () => {
  let component: AdminClinicDetailComponent;
  let fixture: ComponentFixture<AdminClinicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClinicDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClinicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
