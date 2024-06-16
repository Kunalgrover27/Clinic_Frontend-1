import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClinicComponent } from './admin/add-clinic/add-clinic.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { AdminClinicDetailComponent } from './admin/admin-clinic-detail/admin-clinic-detail.component';
import { AdmindoctorsComponent } from './admin/admindoctors/admindoctors.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { DiseaseClinicComponent } from './admin/disease-clinic/disease-clinic.component';
import { DiseaseDetailComponent } from './admin/disease-detail/disease-detail.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';
import { UpdateClinicComponent } from './admin/update-clinic/update-clinic.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { AppointmentBookComponent } from './user/appointment-book/appointment-book.component';
import { ClinicDetailComponent } from './user/clinic-detail/clinic-detail.component';
import { MainpageComponent } from './user/mainpage/mainpage.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { ViewAppointmentsComponent } from './user/view-appointments/view-appointments.component';
import { ViewClinicsComponent } from './user/view-clinics/view-clinics.component';
import { ViewprofileComponent } from './user/viewprofile/viewprofile.component';

const routes: Routes = [
  { path: '', redirectTo: "/homepage", pathMatch: "full" },  
  { path: 'homepage', component: HomepageComponent },
  { path: 'main', component: MainpageComponent},
  { path: 'mainAdmin', component: AdminhomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'allClinicsByDisease/:id', component:ViewClinicsComponent },
  { path: 'clinicDetail/:diseaseId/:clinicId', component:ClinicDetailComponent },
  { path: 'clinicDetailAdmin/:id', component:AdmindoctorsComponent},
  { path: 'admindisease', component: DiseaseDetailComponent},
  { path: 'adminclinic', component: AdminClinicDetailComponent},
  { path: 'appointmentDetail/:diseaseId/:clinicId/:doctorId', component:AppointmentBookComponent },
  { path: 'viewProfile/:id', component:ViewprofileComponent },
  { path: 'updateProfile/:id', component:UpdateprofileComponent },
  { path: 'viewAppointments/:id', component:ViewAppointmentsComponent },
  { path: 'addClinic', component: AddClinicComponent},
  { path: 'updateClinic/:id', component:UpdateClinicComponent },
  { path: 'addClinicDoctor/:id', component:AddDoctorComponent },
  { path: 'diseaseDetails/:id', component:DiseaseClinicComponent },
  { path: 'patientDetails/:id', component:PatientDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
