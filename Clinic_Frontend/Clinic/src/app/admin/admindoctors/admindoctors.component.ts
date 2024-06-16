import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserConfigService } from 'src/app/configuration/user_config';
import { Clinic } from 'src/model/Clinic';

@Component({
  selector: 'app-admindoctors',
  templateUrl: './admindoctors.component.html',
  styleUrls: ['./admindoctors.component.css']
})
export class AdmindoctorsComponent implements OnInit {
  clinic: Clinic = new Clinic(0, "","","","","",0,"")
  id: any
  userName:any;
  diseaseName:any
  status:any;
token:any
  constructor(private route: ActivatedRoute,private router:Router,private configService: UserConfigService,private http: HttpClient) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.token = localStorage.getItem("token")
    if(this.token!=null){
    this.configService.getClinicById(this.id,this.token).subscribe((data: Clinic) => {
      console.log(data);
      this.clinic=data;
 
    },
    error => {
     console.log(error);
   
   });
   }
  }
   deleteClinic(id:number){
    if (this.token != null) {
      let options = {
        headers: { "Authorization": "Bearer " + this.token }
      }
    this.http.delete('http://localhost:9100/appointment/deleteClinic/'+id,options)
        .subscribe(() => this.status = 'Delete successful');
      alert("Clinic is deleted");
      this.router.navigate(['adminclinic']);

  }
}
deleteDoctor(id:number){
  if (this.token != null) {
    let options = {
      headers: { "Authorization": "Bearer " + this.token }
    }
  this.http.delete('http://localhost:9100/appointment/deleteDoctor/'+id,options)
  .subscribe(() => this.status = 'Delete successful');
alert("Doctor is deleted");
location.reload();
  }
}
  }


