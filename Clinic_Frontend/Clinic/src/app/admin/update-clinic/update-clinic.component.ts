import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Clinic } from 'src/model/Clinic';

@Component({
  selector: 'app-update-clinic',
  templateUrl: './update-clinic.component.html',
  styleUrls: ['./update-clinic.component.css']
})
export class UpdateClinicComponent implements OnInit {
  clinic: Clinic = new Clinic(0,"","","","","",0,"")
  clinicId:any
  selectedDays: any[]=[];
  daysOfWeek=['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  token:any
  constructor(private configService: AdminConfigService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.clinicId = Number(this.route.snapshot.paramMap.get('id'))
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getClinicDetailsById(this.clinicId,this.token).subscribe((data: Clinic) => {
      this.clinic.clinicId=data.clinicId
      this.clinic.clinicName = data.clinicName
      this.clinic.address = data.address
      this.clinic.days=data.days
      this.clinic.contactUs=data.contactUs
      this.clinic.doctor=data.doctor
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
}
  submitForm(clinicForm:any){
    if(!/^\d{10}$/.test(this.clinic['contactUs']?.toString())){
      return ;
    }
    this.clinic.startTime=this.transformTime(this.clinic.startTime)
    this.clinic.endTime=this.transformTime(this.clinic.endTime)
    if(this.token!=null){
    this.configService.updateClinic(this.clinic,this.token).subscribe(() => {
      alert("Clinic is updated successfully");
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
}
