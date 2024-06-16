import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindoctorsComponent } from './admindoctors.component';

describe('AdmindoctorsComponent', () => {
  let component: AdmindoctorsComponent;
  let fixture: ComponentFixture<AdmindoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
