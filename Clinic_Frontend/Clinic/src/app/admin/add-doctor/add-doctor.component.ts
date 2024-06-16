import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { ClinicModel } from 'src/model/ClinicModel';
import { Disease } from 'src/model/Disease';
import { Doctor } from 'src/model/Doctor';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctor: Doctor = new Doctor(0,"","",0,0)
  diseases: Disease[] = []
  clinicId:any
  token: any

constructor(private configService: AdminConfigService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.clinicId = Number(this.route.snapshot.paramMap.get('id'))
    console.log(this.clinicId)
     if(this.token!=null){
    this.configService.getAllDiseases(this.token).subscribe((data: Disease[]) => {
      this.diseases=data;
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }
}
  submitForm(){
    const url=`addDoctor/${this.clinicId}`;
    console.log(this.doctor)
    if(this.token!=null){

    this.configService.addDoctor(url,this.doctor,this.token).subscribe(() => {
      alert("Doctor is added successfully");
      this.router.navigate([`clinicDetailAdmin/${this.clinicId}`]);
    },
    error => {
     console.log(error);
  
   });
  }
  }
}
