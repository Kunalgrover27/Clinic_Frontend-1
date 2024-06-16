import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Patient } from 'src/model/Patient';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
userModel=new Patient();
//jwt token
token: string | null = ""
id:any
value:any
userName:any
selectedImage:File | undefined;
passwordDoNotMatch=false;

  constructor(private configService: UserConfigService,private route: ActivatedRoute,private router:Router) { }
  onImageChange(event:any){
    this.selectedImage=event.target.files[0];
    this.userModel.gender='male'
  }
  ngOnInit(): void {
    if(this.userModel.password!=this.userModel.confirmPassword){
      this.passwordDoNotMatch=true;
    }
    else{
      this.passwordDoNotMatch=false;
    }
    this.token = localStorage.getItem("token")
    this.userName=localStorage.getItem('currentUser')
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    if (this.token != null) {
      this.configService.getPatientDetails(this.userName,this.token).subscribe((data: Patient) => {
        //save the data in employee object
        this.userModel.id=data.id
        this.userModel.firstName = data.firstName
        this.userModel.lastName = data.lastName
        this.userModel.userName=data.userName
        this.userModel.email = data.email
        this.userModel.gender=data.gender
        this.userModel.dob=data.dob
        this.userModel.image=data.image

        console.log(data)
      }, error => {
        console.log(error)
      })
 }


  }
  onSubmit()
  {
    const formData=new FormData();
    formData.append('id',this.userModel.id);
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
    this.userModel.id=this.id;
    if (this.token != null) {
    this.configService.updatePatient(formData,this.token).subscribe(
      (data)=>
      {
        console.log("success! : ",data);
      },
      error=>{
        console.log("Error : ",error);
      });
  }

  }
}