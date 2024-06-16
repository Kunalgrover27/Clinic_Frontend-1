import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/model/Patient';
import { UserConfigService } from '../configuration/user_config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModel=new Patient();
  selectedImage:File | undefined;
 passwordDoNotMatch=false;
  constructor(private configService: UserConfigService,private router:Router) { }
onImageChange(event:any){
  this.selectedImage=event.target.files[0];
  this.userModel.gender='male'
}
  ngOnInit(): void {
  }
  onSubmit()
  {
if(this.userModel.password!=this.userModel.confirmPassword){
  this.passwordDoNotMatch=true;
}
else{
  this.passwordDoNotMatch=false;
}
const formData=new FormData();
formData.append('firstName',this.userModel.firstName);
formData.append('lastName',this.userModel.lastName);
formData.append('userName',this.userModel.userName);
formData.append('password',this.userModel.password);
formData.append('confirmPassword',this.userModel.confirmPassword);
formData.append('email',this.userModel.email);
formData.append('dob',this.userModel.dob);
formData.append('gender',this.userModel.gender);
if(this.selectedImage){
  formData.append('image',this.selectedImage);

}

    this.configService.registerPatient(formData).subscribe(
      (data)=>
      {
        console.log("success! : ",data);
        alert("Registration Success");
        this.router.navigate([""]);

      },
      error=>{
        console.log("Error : ",error);
        alert("Registration unsuccessfull!!");
      });
  }
}
