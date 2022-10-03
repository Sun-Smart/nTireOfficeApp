/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})
export class AddcontactPage implements OnInit {
  function;
  items = [];
  isItemAvailable;
  companiesstr;
  companyname1 = [];
  companyname;
  validmobile: boolean;
  company;
  validemail: boolean;
  exampleText;
  specialKeys;
  constructor(private model: ModalController, public alertController: AlertController, public modalCtrl: ModalController, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.isItemAvailable = false; // initialize the items with false

    this.exampleText = "";
    this.function = localStorage.getItem('FUNCTION_DESC');

  }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  getItems(ev: any) {
    this.companyname1 = [];
    if (ev.target.value == "") {
      this.companyname1 = [];
      this.isItemAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'getcompany/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.companyname1 = [];
      this.isItemAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = JSON.stringify(resp);
      this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());

      for (var i = 0; i < this.companiesstr.length; i++) {

        this.companyname1.push(this.companiesstr[i].companyName);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.companyname1 = this.companyname1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }
  adddata(item) {
    this.company = item;
    this.isItemAvailable = false;
  }
  companyName;
  function_id;
  branch_id;
  user_id;
  userType_id;
  officePhone;
  residencePhone;
  contactname;
  designation;
  mobilenumber;
  emailid;
  officenumber;
  AddContact() {
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.company == this.companiesstr[i].companyName) {
        this.companyName = this.companiesstr[i].id;
      }

    }
    this.function_id = window.localStorage["FUNCTION_ID"];
    this.branch_id = window.localStorage['TUM_BRANCH_ID'];
    this.user_id = window.localStorage['TUM_USER_ID'];
    this.userType_id = window.localStorage['TUM_USER_TYPE'];
    if (this.officePhone == '') {
      this.officePhone = 0;
    }
    if (this.residencePhone == '' || this.residencePhone == undefined) {
      this.residencePhone = 0;
    }
    console.log(this.companyName);
    if (this.companyName != undefined || this.companyName == 'undefined') {
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'addContact' + '/' + this.companyName + '/' + this.function_id + '/' + this.branch_id + '/' + this.contactname + '/' + this.designation + '/' + this.mobilenumber + '/' + this.emailid + '/' + this.officenumber + '/' + this.residencePhone + '/' + this.user_id + '/' + this.userType_id, {
        headers: options,
      }).subscribe(resp => {


        if (resp.toString() == '"Contact Already Exists"') {
          this.presentAlert("Alert", "Contact Already Exists");
        } else {
          this.presentAlert("Successful", "Contact Added Successfully");
          this.company = undefined;
          this.officePhone = undefined;
          this.residencePhone = undefined;
          this.contactname = undefined;
          this.designation = undefined;
          this.mobilenumber = undefined;
          this.emailid = undefined;
          this.officenumber = undefined;

        }
      }, error => {
        console.log("error : " + JSON.stringify(error));
      });
    } else {
      this.presentAlert('Alert', 'Enter Valid Company Name');
    }
  }
  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass:'buttonCss',
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }
  mobilenumbervalid(mobilenumber){
    if(mobilenumber!=undefined && mobilenumber.length!=9){
      this.validmobile=true;
    }
    else{
      this.validmobile=false;
    }
  }
  emailnumbaervalid(emailid){

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // return re.test(String(email).toLowerCase());
  //  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailid) == false)
    {
      this.validemail=true;
    }
    else{
      this.validemail=false;
    }
  }
  closemodel(){
    this.model.dismiss();
  }
  numberOnlyValidation(event: any) {

    console.log("check value"+event.key+":"+this.exampleText);
    this.specialKeys = ["1", "2", "3", "4","5","6","7","8","9","0"];
    var examp= ["Unidentified"];

    if(examp.indexOf(event.key) !== -1)  {
      console.log("this.mobile.length :"+this.mobilenumber.length);
      if(this.mobilenumber.length>1 && this.exampleText!='' && this.exampleText.length!=0){

        var newStr = this.exampleText.substring(0, this.exampleText.length-1);

        this.exampleText=newStr;

      }
      if(this.mobilenumber.length==0){
        this.exampleText='';
      }
    }
    else if (this.specialKeys.indexOf(event.key) == -1) {
      console.log("error");
       this.mobilenumber = ''; //cleartextbox

    } else {
     this.exampleText=this.exampleText+event.key;
    }
    this.mobilenumber = this.exampleText; //set ur textbox
  }
}
