import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Clinic } from 'src/model/Clinic';
import { Disease } from 'src/model/Disease';

@Component({
  selector: 'app-view-clinics',
  templateUrl: './view-clinics.component.html',
  styleUrls: ['./view-clinics.component.css']
})
export class ViewClinicsComponent implements OnInit {
  id: any
  diseaseName:any
  clinics: Clinic[] = []
  userName:any
  token:any
  constructor(private route: ActivatedRoute,private configService: UserConfigService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.token = localStorage.getItem("token")

    if(this.token!=null){
    this.configService.getDiseaseByID(this.id,this.token).subscribe((data: Disease) => {
     this.diseaseName=data.name
     this.clinics=data.clinics
   },
   error => {
    console.log(error);
  
  });
}
}

}
