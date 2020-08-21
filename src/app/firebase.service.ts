import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  authState:any=null;

  constructor(public service:AngularFirestore, public authService:AngularFireAuth) { 
      this.authService.authState.subscribe((state)=>{
      this.authState=state;
        });
        console.log(this.authState);
  }

  //ajout d'un utilisateur
  addUser(user){
     this.service.collection('users').add(user);
  }

  getUsers(){
    return this.service.collection('users').snapshotChanges();
  }
  //registration des utilisateurs
  register(email,password){
    return this.authService.createUserWithEmailAndPassword(email,password);
  }
  //authentification
  login(email,password){
    return this.authService.signInWithEmailAndPassword(email,password).then((user)=>{
      this.authState=user;
    }).catch((error)=>{
      console.log(error.message);
    });
  }
  //décconnexion
  signout(){
    this.authService.signOut();
  }
  

}
