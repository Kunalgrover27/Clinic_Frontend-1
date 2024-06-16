import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminConfigService } from 'src/app/configuration/admin_config';
import { Clinic } from 'src/model/Clinic';
import { Disease } from 'src/model/Disease';
import { Doctor } from 'src/model/Doctor';

@Component({
  selector: 'app-disease-clinic',
  templateUrl: './disease-clinic.component.html',
  styleUrls: ['./disease-clinic.component.css']
})
export class DiseaseClinicComponent implements OnInit {
  clinics: Clinic[] = []
  clinicToAdd: Clinic[] = []
  filteredClinic: Clinic[] = []
  Disease:Disease=new Disease(0,"","")
  Doctors:Doctor[]=[]
  clinicId:any
  diseaseId:any;
  clinic: Clinic = new Clinic(0,"","","","","",0,"")
  status:any;
  id:any
  diseaseName:any
  token:any
  isViewClinics:boolean=true;
  constructor(private route: ActivatedRoute,private configService: AdminConfigService,private http: HttpClient) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.token = localStorage.getItem("token")
     this.viewClinics();
  }
     viewClinics(){
      this.isViewClinics=true;
      if(this.token!=null){
      this.configService.getDiseaseByID(this.id,this.token).subscribe((data: Disease) => {
        this.diseaseName=data.name
        this.diseaseId=data.id
        this.Disease=data;
        this.clinics=data.clinics
      },
      error => {
       console.log(error);
     
     });
     }
    }
     addClinics(){
       this.isViewClinics=false;
       if(this.token!=null){
      this.configService.getAllClinics(this.token).subscribe((data: Clinic[]) => {
        this.clinicToAdd=data
        this.clinicToAdd=this.clinicToAdd.filter(clinicTo=>!this.clinics.some(clinic=>clinic.clinicId===clinicTo.clinicId));
        this.filteredClinic=this.clinicToAdd.filter(clinic=>
        clinic.doctor.some((d:{doctorId:number, doctorName:string, disease:string, consulationFee:number, experience:number,}) =>d.disease===this.diseaseName));
      },
      error => {
       console.log(error);
     
     });
     }
    }
     AddClinicToDisease(clinicId:number){
      const url=`addClinicToDisease/${this.diseaseId}`;
      if(this.token!=null){
      this.configService.getClinicDetailsById(clinicId,this.token).subscribe((data: Clinic) => {
        this.clinic=data
        console.log(this.clinic)
        this.configService.addClinicToDisease(url,this.clinic,this.token).subscribe(() => {
          alert("Clinic is added successfully to Disease");
          location.reload();

        },
        error => {
         console.log(error);
      
       });
      }, error => {
        console.log(error)
      })
    }
     
     }
     deleteClinicFromDisease(clinicId:number){
      let options = {
        headers: { "Authorization": "Bearer " + this.token }
      }
      this.http.delete('http://localhost:9100/appointment/deleteClinicForDisease/'+this.diseaseId+'/'+clinicId,options)
      .subscribe(() => this.status = 'Delete successful');
    alert("Clinic For Disease is deleted");
    location.reload();
     }
  }


