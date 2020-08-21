import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import {Router} from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  email:string;
  password:string;
  error:string=null;

  constructor(private firebaservice:FirebaseService, private router:Router) { }

  ngOnInit() {
    this.firebaservice.signout();
  }
  
  connect(){
    this.firebaservice.login(this.email,this.password).then(()=>{
          if(this.firebaservice.authState!=null){
          this.router.navigate(['folder/Inbox']);
          this.email="";
          this.password="";
          }else{
            this.error="invalid informations";
            this.password="";
          }
    });
  }

}
