import { DatePipe } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Appointment } from 'src/model/Appointment';
import { Clinic } from 'src/model/Clinic';

@Component({
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.css']
})
export class AppointmentBookComponent implements OnInit {
clinicId:any
doctorId:any
// hour:number=0;
// minute:number=0;
isTimeWithinRange:boolean=false;
clinic: Clinic = new Clinic(0, "","","","","",0,"")
doctorName:any
doctorSpeciality:any
doctorExperience:any
days: string=""
startTime:any
endTime:any
result:any
appointment:Appointment=new Appointment()
chosenDate:any
appointmentDate:any
timeEnteredByUser:string=''
appointmentBooked:boolean=false
diseaseId:any
token:any
finalDays:string[]=[]
todayDate:any
constructor(private route: ActivatedRoute,private configService: UserConfigService) { }
myFilter = (d: Date | null): boolean => {
  const day = (d || new Date()).getDay();
  const dayName=this.getDayName(day);
  return this.finalDays.includes(dayName);
};

getDayName(dayIndex:number):string{
  const dayWeek=['Sun','Mon','Tues','Wed','Thurs','Fri','Satur']
  return dayWeek[dayIndex];
}
isTimeInRange(inputTime:string,startTime:string,endTime:string):boolean{
  const inputTimeHours=parseInt(inputTime.split(':')[0])
  const inputTimeMinutes=parseInt(inputTime.split(':')[1])
  const startTimeHours=parseInt(startTime.split(':')[0])
  const startTimeMinutes=parseInt(startTime.split(':')[1])
  const endTimeHours=parseInt(endTime.split(':')[0])
  const endTimeMinutes=parseInt(endTime.split(':')[1])
  const inputMinutesSinceMidnight = inputTimeHours*60+inputTimeMinutes;
  const startMinutesSinceMidnight=startTimeHours*60+startTimeMinutes;
  const endMinutesSinceMidnight=endTimeHours*60+endTimeMinutes;
  return inputMinutesSinceMidnight>=startMinutesSinceMidnight&&inputMinutesSinceMidnight<=endMinutesSinceMidnight;

}

bookAppointment(){
this.isTimeWithinRange=this.isTimeInRange(this.appointment.time,this.startTime,this.endTime)
this.timeEnteredByUser=this.convert24HoursTo12Hours(this.appointment.time)
console.log(this.token)
if(this.isTimeWithinRange){
this.appointment.diseaseId=Number(this.route.snapshot.paramMap.get('diseaseId'))
this.appointment.clinicId=Number(this.route.snapshot.paramMap.get('clinicId'))
this.appointment.doctorId=Number(this.route.snapshot.paramMap.get('doctorId'))
this.appointment.patientId= localStorage.getItem('currentUserId')
this.appointment.date=this.appointmentDate
this.appointment.time=this.timeEnteredByUser
this.appointment.clinicName=this.clinic.clinicName+" " +this.clinic.address;
this.appointment.doctorName=this.doctorName
this.appointment.diseaseName=this.doctorSpeciality
console.log(this.appointment)
this.configService.bookAppointment(this.appointment,this.token).subscribe((data) => {
  console.log("success! : ",data);
  this.appointmentBooked=true;

  },
  error => {
   console.log(error);

 });
 }
else{
  alert("Please enter the time within clinic opening hours")

}
}


convert12HoursTo24Hours(time12:string):string{
  const timeArray=time12.split(' ');
  const hourMinute=timeArray[0].split(':');
  const ampm=timeArray[1];
  let hour=parseInt(hourMinute[0]);
  const minute=hourMinute[1]
  if(ampm==='PM' && hour!=12){
    hour=hour+12;
  }
  else if(ampm==='AM' && hour===12){
    hour=0;
  }
  const hour24=hour.toString().padStart(2,'0');
  return `${hour24}:${minute}`;
}
convert24HoursTo12Hours(time24:string):string{
  const timeArray=time24.split(':');
  const hour=parseInt(timeArray[0]);
  const minute=timeArray[1];
  let ampm='AM';
  if(hour>=12){
    ampm='PM';

  }
  let hour12=hour%12;
  if(hour12===0){
    hour12=12;
  }
  return `${hour12}:${minute} ${ampm}`;
}
  ngOnInit(): void {
    const datePipe=new DatePipe('en-US')
    this.diseaseId=Number(this.route.snapshot.paramMap.get('diseaseId'))
    this.clinicId = Number(this.route.snapshot.paramMap.get('clinicId'))
    this.doctorId=Number(this.route.snapshot.paramMap.get('doctorId'))
    this.token = localStorage.getItem("token")
    this.todayDate=datePipe.transform(new Date(), 'yyyy-MM-dd');
    if(this.token!=null){
    this.configService.getClinicById(this.clinicId,this.token).subscribe((data: Clinic) => {
    this.clinic=data
    this.days=data.days
    this.startTime=this.convert12HoursTo24Hours(data.startTime)
    this.finalDays=this.getDaysOfWeek(this.days)
    this.endTime=this.convert12HoursTo24Hours(data.endTime)
  
    for (let x in this.clinic.doctor) {
          if((this.clinic.doctor[x].doctorId)==this.doctorId){
            this.doctorName=this.clinic.doctor[x].doctorName;
            this.doctorSpeciality=this.clinic.doctor[x].disease;
            this.doctorExperience=this.clinic.doctor[x].experience;

          }
    }

    },
    error => {
     console.log(error);
   
   });
 
  }
 

  }
  getDaysOfWeek(d:string){
   const finalDays=d.split(" ");
   return finalDays
  }
  getEndDate(type: string, event: MatDatepickerInputEvent<Date>){

    this.chosenDate=event.value
    console.log(this.chosenDate);
    const datePipe=new DatePipe('en-US')
    this.appointmentDate=datePipe.transform(this.chosenDate,'dd/MM/yyyy');
  }
 
}
