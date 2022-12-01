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
      branch_id: window.localStorage['id'],
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

debugger
      if (resp.toString() == '"Company already Exist"') {

        this.presentAlert('Alert', 'Company name already exists');

      } else {
        this.presentAlert1('Successful', 'Company Added Successfully');
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
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      cssClass: 'Cssbutton',
      header: heading,
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }


  async clearCorporateForm() {
    console.log('click check');

    // if ((this.branch == '<< Select >>' && this.branchlocation == '<< Select >>' && this.productdata == '<< Select >>' && this.Salutation == '<< Select >>' && this.firstname == undefined || this.lastname == undefined && this.mobile == undefined && this.callpriority == undefined && this.callrating == '<< Select >>' && this.callnature == '<< Select >>' && this.callstage == '<< Select >>' && this.nextaction == '<< Select >>' && this.leadby == '<< Select >>' && this.remarks == undefined)) {

    // }
    // else {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.companyname = undefined;
            this.cropaddress = undefined;

          }
        }
      ]
    });

    await alert.present();
    // }
  }
  // clearCorporateForm() {
  //   this.companyname = undefined;
  //   this.cropaddress = undefined;
  // }
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
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
}
