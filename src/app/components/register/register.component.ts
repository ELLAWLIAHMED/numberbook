import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import {Router} from '@angular/router';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public countries:any[];
  selectedCountry:string="Morocco";
  selectedCode:string="+212";
  selectedFlag:string="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg";
  name:string;
  email:string;
  number:string;
  password:string;
  confirmedpassword:string;
  users:any[];
  //validInfo:boolean=!this.name || !this.email ;
 
  constructor(private firebaservice:FirebaseService,private router:Router) { }

  ngOnInit() {
    fetch('https://raw.githubusercontent.com/AccessGateLabs/useful-jsons/master/country-codes/country-code-with-svg-flag.json')
       .then(response => response.json())
       .then(data => this.countries=data);

    this.firebaservice.getUsers().subscribe((data)=>{
      this.users=data.map((e)=> {
        return({
          "id":e.payload.doc.id,
          "name":e.payload.doc.data()["name"],
          "email":e.payload.doc.data()["email"],
          "country":e.payload.doc.data()["country"],
          "number":e.payload.doc.data()["number"]
        });
      })
    });
    
    
    
    
  
  }
  changed(value){
      this.selectedCountry=value;
      let selectedObject=this.countries.filter((country)=>country.name==value)[0];
      this.selectedFlag=selectedObject.flag;
      this.selectedCode=selectedObject.number;
      //console.log(this.countries);
  }

  register(){
    let user={
      "name": this.name,
      "email" : this.email,
      "number" : this.selectedCode+this.number,
      "country":this.selectedCountry,
      "password" : this.password
    };
   console.log(user);
   this.firebaservice.register(user.email,user.password);
   //this.firebaservice.addUser(user);
   this.router.navigate(['login']);
  }
}
