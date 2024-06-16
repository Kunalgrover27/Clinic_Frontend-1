import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 

import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MainpageComponent } from './user/mainpage/mainpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewClinicsComponent } from './user/view-clinics/view-clinics.component';
import { ClinicDetailComponent } from './user/clinic-detail/clinic-detail.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { DiseaseDetailComponent } from './admin/disease-detail/disease-detail.component';
import { UpdateClinicComponent } from './admin/update-clinic/update-clinic.component';
import { AddClinicComponent } from './admin/add-clinic/add-clinic.component';
import { AdminClinicDetailComponent } from './admin/admin-clinic-detail/admin-clinic-detail.component';
import { AdmindoctorsComponent } from './admin/admindoctors/admindoctors.component';
import { AppointmentBookComponent } from './user/appointment-book/appointment-book.component';
import { ViewprofileComponent } from './user/viewprofile/viewprofile.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { RegisterComponent } from './register/register.component';
import { ViewAppointmentsComponent } from './user/view-appointments/view-appointments.component';
import { CommonModule } from '@angular/common';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { DiseaseClinicComponent } from './admin/disease-clinic/disease-clinic.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    NavbarComponent,
    HomepageComponent,
    ViewClinicsComponent,
    ClinicDetailComponent,
    AdminhomeComponent,
    DiseaseDetailComponent,
    UpdateClinicComponent,
    AddClinicComponent,
    AdminClinicDetailComponent,
    AdmindoctorsComponent,
    AppointmentBookComponent,
    ViewprofileComponent,
    UpdateprofileComponent,
    RegisterComponent,
    ViewAppointmentsComponent,
    AddDoctorComponent,
    DiseaseClinicComponent,
    PatientDetailsComponent,   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatInputModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    HttpClientModule,
ReactiveFormsModule
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent],

})
export class AppModule { }
