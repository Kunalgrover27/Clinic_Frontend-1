import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginModel } from 'src/model/Login';
import { UserConfigService } from '../configuration/user_config';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  loginModel=new LoginModel();
  token:any;
  userName:any;
  base64Image:any
  isCorrect:boolean=false;
  isAdmin:string="true";
  constructor(private configService: UserConfigService,private sanitizer:DomSanitizer,private router:Router) { }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
}
  ngOnInit(): void {
  
  }
  onSubmit(){-
    this.configService.loginUser(this.loginModel).subscribe(
      data=>{
        this.token=data;
        console.log("success! Token =: ",data),
        localStorage.setItem('token',data),
        this.userName=this.loginModel.userName
        console.log(this.userName)
        localStorage.setItem('currentUser', this.userName)

           if(this.userName=='admin@gmail.com')
          {  
            localStorage.setItem('isAdmin', this.isAdmin)
             this.router.navigate(['mainAdmin']);
          }
          else{
            this.router.navigate(['main']);
          }
        },
        error=>{
            console.log("Error : ",error);
        }); 
           
  }


  }