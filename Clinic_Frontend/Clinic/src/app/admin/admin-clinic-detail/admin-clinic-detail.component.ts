import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Clinic } from 'src/model/Clinic';

@Component({
  selector: 'app-admin-clinic-detail',
  templateUrl: './admin-clinic-detail.component.html',
  styleUrls: ['./admin-clinic-detail.component.css']
})
export class AdminClinicDetailComponent implements OnInit {
  clinics: Clinic[] = []
  token:any
  constructor(private route: ActivatedRoute,private configService: AdminConfigService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getAllClinics(this.token).subscribe((data: Clinic[]) => {
     console.log(data);
     this.clinics=data;

   },
   error => {
    console.log(error);
  
  });
  }
  }
}
