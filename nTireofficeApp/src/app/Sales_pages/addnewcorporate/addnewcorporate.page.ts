/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddcontactPage } from '../addcontact/addcontact.page';
// import {AddcontactPage} from '../addcontact/addcontact.page';

@Component({
  selector: 'app-addnewcorporate',
  templateUrl: './addnewcorporate.page.html',
  styleUrls: ['./addnewcorporate.page.scss'],
})
export class AddnewcorporatePage implements OnInit {
  function;
  companyname;
  cropaddress;
  username: any;
  constructor(public modalController: ModalController, public alertController: AlertController, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.function = localStorage.getItem('FUNCTION_DESC') + ' | ' + window.localStorage.TUM_BRANCH_CODE;
    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }
  handleAddressChange(event) {
    console.log(event.geometry.location.lat());
    console.log(event.geometry.location.lng());
  }
  AddCompany() {

    var corp = {
      // eslint-disable-next-line @typescript-eslint/quotes
      function_id: window.localStorage["FUNCTION_ID"],
      branch_id: window.localStorage['TUM_BRANCH_ID'],
      user_id: window.localStorage['TUM_USER_ID'],
      userType_id: window.localStorage['TUM_USER_TYPE'],
      pincode: 0,
      companyName: this.companyname,
      address: this.cropaddress
    };
    const header = new Headers();
    // eslint-disable-next-line @typescript-eslint/quotes
    header.append("Content-Type", "application/json");

    const options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + '/nTireMobileCoreAPI/api/Sales/NewCorporate' + '/' + corp.function_id + '/' + corp.branch_id + '/' + corp.companyName + '/' + corp.address + '/' + corp.pincode + '/' + corp.user_id + '/' + corp.userType_id, {
      headers: options,
    }).subscribe(resp => {


      if (resp.toString() == '"Company already Exist"') {

        this.presentAlert('Alert', 'Company name already exists');

      } else {
        this.presentAlert('Successful', 'Company Added Successfully');
        this.companyname = undefined;
        this.cropaddress = undefined;
      }


    }, error => {

      console.log('error : ' + JSON.stringify(error));

    });
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      cssClass: 'buttonCss',
      header: heading,
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  clearCorporateForm() {
    this.companyname = undefined;
    this.cropaddress = undefined;
  }
  async AddContact() {
    const modal = await this.modalController.create({
      component: AddcontactPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
    return await modal.present();

  }
}
