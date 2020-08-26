import { Component, OnInit } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { ModalController } from '@ionic/angular';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  mycontacts: Contact[] = [];
  reset: boolean=false;
  loading:boolean=true;


  constructor(private contacts: Contacts,public modalCtrl: ModalController) { }

  ngOnInit() {
    let option = {
      filter : '',
      multiple: true,
      hasPhoneNumber: true
    };
    this.contacts.find(['*'] , option).then((contacts: Contact[]) =>{
        this.mycontacts = contacts;
        this.loading=false;
    })
    

  }

 
  search(q){
    this.loading=true;
    if (q != '') {
      this.reset=true;
    } else {
      this.reset=false;
    }
    let option = {
      filter : q,
      multiple: true,
      hasPhoneNumber: true
    };
    this.contacts.find(['displayName'] , option).then((contacts: Contact[]) =>{
        this.mycontacts = contacts;
        this.loading=false;
    })
  }



  async ShowDetails(item) {
    let contactDetails = await this.modalCtrl.create({
      component : ContactDetailsComponent,
      componentProps:{Selectedcontact:item}
    });
    return await contactDetails.present();
    
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
