import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Clinic } from 'src/model/Clinic';
import { ClinicModel } from 'src/model/ClinicModel';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent implements OnInit {
  clinic: ClinicModel = new ClinicModel("","","","","",0)
  selectedDays: any[]=[];
  daysOfWeek=['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  token: any

  constructor(private configService: AdminConfigService,private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")

  }
 toggleDay(day:string){
   if(this.clinic.days.includes(day)){
     this.clinic.days=this.clinic.days.split(' ').filter(d=>d!==day).join(' ');

   }
   else{
     if(this.clinic.days){
       this.clinic.days+=' ';
     }
     this.clinic.days+=day;
   }
 }
 isDaySelected(day:string){
   if(this.clinic.days){
   return this.clinic.days.includes(day)
   }
   return false;
 }
submitForm(clinicForm:any){
  if(!/^\d{10}$/.test(this.clinic['contactUs']?.toString())){
    return ;
  }
  this.clinic.startTime=this.transformTime(this.clinic.startTime)
  this.clinic.endTime=this.transformTime(this.clinic.endTime)
  console.log(this.clinic)
  if(this.token!=null){
  this.configService.addClinic(this.clinic,this.token).subscribe(() => {
    alert("Clinic is added successfully");
    this.router.navigate(['adminclinic']);
  },
  error => {
   console.log(error);

 });
}
}
transformTime(time24:string):string{
 const[hours,minutes]=time24.split(':');
let period='AM';
let hours12=parseInt(hours,10);
if(hours12>=12){
  period='PM';
  if(hours12>12){
    hours12-=12;
  }
}
const formattedTime=`${hours12}:${minutes} ${period}`;
return formattedTime;
}
}

