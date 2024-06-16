import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Disease } from 'src/model/Disease';
import { DiseaseModel } from 'src/model/DiseaseModel';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.css']
})
export class DiseaseDetailComponent implements OnInit {
  diseases: Disease[] = []
  disease:DiseaseModel=new DiseaseModel()
  status:any;
  token: any

  constructor(private configService: AdminConfigService,private http: HttpClient) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.configService.getAllDiseases(this.token).subscribe((data: Disease[]) => {
      this.diseases=data;
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }
  addDisease(){
    this.configService.addDisease(this.disease,this.token).subscribe(() => {
      alert("Disease Added Successfully");
    },
      error => {
        console.log(error);
      });

  }
  deleteDisease(diseaseId:number){
    let options = {
      headers: { "Authorization": "Bearer " + this.token }
    }
    this.http.delete('http://localhost:9100/appointment/deleteDisease/'+diseaseId,options)
    .subscribe(() => this.status = 'Delete successful');
  alert("Disease is deleted");
  location.reload();
  }

}
