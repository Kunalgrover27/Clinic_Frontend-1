import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Disease } from 'src/model/Disease';
import { Clinic } from 'src/model/Clinic';
import { Patient } from 'src/model/Patient';
import { ClinicModel } from 'src/model/ClinicModel';
import { Doctor } from 'src/model/Doctor';
import { DiseaseModel } from 'src/model/DiseaseModel';
import { Appointment } from 'src/model/Appointment';

@Injectable({
  providedIn: 'root'
})
//service to call all the microservice
export class AdminConfigService {
private apiUrl='http://localhost:8500/appointment'
token:any;

  constructor(private http: HttpClient) { }

getAllDiseases(token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
    return this.http.get<Disease[]>("/appointment/getAllDisease",options)
}
getAllClinicByDisease(id: number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
    return this.http.get<Clinic[]>("/appointment/getClinicsByDisease/"+id,options)
}
getAllClinics(token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Clinic[]>("/appointment/getAllClinics",options)

}
getAdminDetails(email:string,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Patient>("/appointment/getPatientDetails/"+email,options)

}
addClinic(clinic:ClinicModel,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post("/appointment/addClinic",clinic,options)

}
getClinicDetailsById(clinicId:number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
return this.http.get<Clinic>("http://localhost:9100/appointment/clinicDetailById/"+clinicId,options)

}
updateClinic(clinic:Clinic,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post("http://localhost:9100/appointment/UpdateClinic",clinic,options)

}
addDisease(disease:DiseaseModel,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post("/appointment/createDisease",disease,options)

}
addDoctor(url:string,doctor:Doctor,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post<Doctor>(`${this.apiUrl}/${url}`,doctor,options)

}
getDiseaseByID(id: number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Disease>("/appointment/getDisease/"+id,options)
}
addClinicToDisease(url:string,clinic:Clinic,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post<Doctor>(`${this.apiUrl}/${url}`,clinic,options)

}
getAllAppointments(token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Appointment[]>("/appointment/getAllAppointments",options)

}
}

