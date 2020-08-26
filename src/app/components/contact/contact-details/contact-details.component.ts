import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController  } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
}) 
export class ContactDetailsComponent implements OnInit {
  SelectedContact:any;

  constructor(public navParams: NavParams,public modalCtrl: ModalController,public alertController: AlertController,private callNumber: CallNumber,private sms: SMS) { }

  ngOnInit() {
    this.SelectedContact = this.navParams.get('Selectedcontact')
  }


  close(){
    this.modalCtrl.dismiss();
  }

  Call(){
    this.callNumber.callNumber(this.SelectedContact.phoneNumbers[0].value,true)
  }

  SendSMS(phone,msg){
    this.sms.send(phone, msg);
  }

  async WriteSMS(phone){
    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Please Write your message here',
        inputs: [
          {
            name: 'msg',
            id: 'msg',
            type: 'textarea',
            placeholder: 'Your Message'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }, 
          {
            text: 'Send',
            handler: (data) => {
              this.SendSMS(phone,data.msg);
            }
          }
        ]
    });
    await alert.present();
  }
}
