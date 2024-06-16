import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Patient } from 'src/model/Patient';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  user:Patient=new Patient()
  userName:any
  token:any;
  base64Image:any
  userId:any;
  isAdmin:boolean=false
  constructor(private configService: UserConfigService,private sanitizer:DomSanitizer,private router:Router) { }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
}
  ngOnInit(): void {
    this.userName=localStorage.getItem('currentUser')
    if(this.userName=='admin@gmail.com'){
      this.isAdmin=true
    }
    this.token=localStorage.getItem('token')
    this.userId=localStorage.getItem('currentUserId')
    if(this.token!=null){
    this.configService.getPatientDetails(this.userName,this.token).subscribe((data:Patient)=>{
      this.user=data;
       this.base64Image='data:image/jpg;base64, '+this.user.image;
      },
      error=>{
        console.log("Error : ",error);
      });
  }
  }
}
