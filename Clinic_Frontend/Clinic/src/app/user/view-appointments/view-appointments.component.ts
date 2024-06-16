import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Appointment } from 'src/model/Appointment';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
id:any
token:any
appointments:Appointment[]=[]
  constructor(private route: ActivatedRoute,private configService: UserConfigService) { }

  ngOnInit(): void {
    this.id= localStorage.getItem('currentUserId')
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getAppointmentsByPatientId(this.id,this.token).subscribe((data: Appointment[]) => {
      this.appointments=data
      },
      error => {
       console.log(error);
     });
     
  }
  }
}
