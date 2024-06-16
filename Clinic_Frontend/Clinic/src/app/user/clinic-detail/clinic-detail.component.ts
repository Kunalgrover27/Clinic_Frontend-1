import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Clinic } from 'src/model/Clinic';
import { Disease } from 'src/model/Disease';
import { Doctor } from 'src/model/Doctor';

@Component({
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent implements OnInit {
  clinic: Clinic = new Clinic(0, "","","","","",0,"")
  doctors:Doctor[]=[]
  id: any
  diseaseId:any
  diseaseName:any
  token:any
  constructor(private route: ActivatedRoute,private configService: UserConfigService) { }

  ngOnInit(): void {
  

    this.id = Number(this.route.snapshot.paramMap.get('clinicId'))
    this.diseaseId=String(this.route.snapshot.paramMap.get('diseaseId'))
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getDiseaseByID(this.diseaseId,this.token).subscribe((data: Disease) => {
      this.diseaseName=data.name
      this.configService.getClinicById(this.id,this.token).subscribe((data: Clinic) => {
        this.clinic=data;
        for (let doctor of this.clinic.doctor) {
   
         if(doctor.disease===this.diseaseName){
           this.doctors.push(doctor)
   
         }
   
        }
      },
      error => {
       console.log(error);
     
     });
    },
    error => {
     console.log(error);
   
   });
  
  }
  }
}
