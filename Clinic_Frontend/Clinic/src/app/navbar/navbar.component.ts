import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:any;
  local:any
  isAdmin:boolean=false
  token:any
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.local = localStorage
    // this.userName=localStorage.getItem('currentUser')
    // if(this.userName=='admin@gmail.com'){
    //   this.isAdmin=true;
    // }

    this.token=localStorage.getItem('token')
    

  }

  logout(){
    localStorage.clear();
    console.log("hhhh");
    this.route.navigate(['/homepage']);
  }
}
