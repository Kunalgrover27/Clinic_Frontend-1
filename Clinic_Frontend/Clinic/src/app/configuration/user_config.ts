import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identity, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Disease } from 'src/model/Disease';
import { Clinic } from 'src/model/Clinic';
import { Patient } from 'src/model/Patient';
import { LoginModel } from 'src/model/Login';
import { Appointment } from 'src/model/Appointment';

@Injectable({
  providedIn: 'root'
})
//service to call all the microservice
export class UserConfigService {
token:any
  constructor(private http: HttpClient) { }

  loginUser(loginModel:LoginModel){
    return this.http.post("/auth/authenticate",loginModel,{responseType:'text'});
  
  }
getClinicById(id:number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Clinic>("/appointment/clinicDetailById/"+id,options)

}
getAllDiseases(token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
    return this.http.get<Disease[]>("/appointment/getAllDisease",options)

}
getDiseaseByID(id: number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
    return this.http.get<Disease>("/appointment/getDisease/"+id,options)
}

registerPatient(formData:FormData){
  return this.http.post("http://localhost:9100/appointment/RegisterPatient",formData)
}
updatePatient(formData:FormData,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.post("/appointment/UpdatePatient",formData,options)

}
getPatientDetails(email:string,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Patient>("/appointment/getPatientDetails/"+email,options)

}
bookAppointment(data:Appointment,token:string)
{
   let options = {
  headers: { "Authorization": "Bearer " + token }
}
  return this.http.post("/appointment/addAppointment",data,options)

}
getAppointmentsByPatientId(id:number,token:string){
  let options = {
    headers: { "Authorization": "Bearer " + token }
  }
  return this.http.get<Appointment[]>("/appointment/getAllAppointmentsByPatientId/"+id,options)

}
}

