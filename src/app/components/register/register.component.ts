import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import {Router} from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

const { Geolocation } = Plugins;

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
 
  mylongitude:any;
  constructor(private firebaservice:FirebaseService,private router:Router,public alertController: AlertController     ) { }

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
    
    Geolocation.getCurrentPosition()
    .then(
      (localisation) => {
        this.mylongitude=localisation.coords.longitude;
        this.presentAlert()
      }
    )
    .catch(
      (error) => console.log(error)
    );
    
    
  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Localisation',
      subHeader: 'My longitude',
      message: this.mylongitude,
      buttons: ['OK']
    });

    await alert.present();
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
