import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Appointment } from 'src/model/Appointment';
import { Patient } from 'src/model/Patient';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  base64Image:any
  user:Patient=new Patient()
  appointments:Appointment[]=[]

  userName:any
  token:any;
  userId:any
  constructor(private configService: AdminConfigService,private sanitizer:DomSanitizer) { }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
}
  ngOnInit(): void {
    this.userName=localStorage.getItem('currentUser')
    this.userId=localStorage.getItem('currentUserId')
    this.token=localStorage.getItem('token')
    if(this.token!=null){
    this.configService.getAdminDetails(this.userName,this.token).subscribe((data:Patient)=>{
    this.user=data;
    this.userId=this.user.id;
    localStorage.setItem('currentUserId', this.userId)
    this.base64Image='data:image/jpeg;base64, '+this.user.image;
    },
    error=>{
      console.log("Error : ",error);
    });
  }
  if(this.token!=null){
    this.configService.getAllAppointments(this.token).subscribe((data: Appointment[]) => {
      this.appointments=data
      },
      error => {
       console.log(error);
     });
  }
  }
}
