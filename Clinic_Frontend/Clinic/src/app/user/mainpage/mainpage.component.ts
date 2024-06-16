import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Disease } from 'src/model/Disease';
import { Patient } from 'src/model/Patient';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  diseases: Disease[] = []
  base64Image:any
  user:Patient=new Patient()
  userName:any
  token:any;
  userId:any;
  constructor(private configService: UserConfigService,private sanitizer:DomSanitizer,private router:Router) { }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
}
  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getAllDiseases(this.token).subscribe((data: Disease[]) => {
      this.diseases=data;
      console.log(data);
    },
      error => {
        console.log(error);
      });
        // Getting Patient Data
        this.userName=localStorage.getItem('currentUser')
        this.token=localStorage.getItem('token')
        this.configService.getPatientDetails(this.userName,this.token).subscribe((data:Patient)=>{
        this.user=data;
        this.userId=this.user.id;
        localStorage.setItem('currentUserId', this.userId)
        this.base64Image='data:image/jpg;base64, '+this.user.image;
        },
        error=>{
          console.log("Error : ",error);
        });
  }
}
}
