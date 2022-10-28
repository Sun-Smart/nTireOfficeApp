/* eslint-disable no-debugger */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  showfilter: boolean = true;
  showdata: any;

  //  filter Branch, Location & property code,

  branchlist1: any = [];
  branchlist: any;
  branchlocationlist: any = [];
  customerlocation: any;
  locationcode1: any[] = [];
  propertyCode1: any[];
  isPropertycodeAvailable: boolean;
  companiesstr: any;
  branch: any;
  branchlocation: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;

  user_type: any;
  Function_id: any;
  Branch_id: any;
  user_id: any;

  getPaymentDetailsList: any;

  customerName: any;
  status: any;
  paymode: any;
  chequeno: any;
  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,) { }

  ngOnInit() {

    this.Getbranches();
    this.getPaymentDetails();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  };
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  filtergetPaymentDetails() {
    debugger;
    if (this.branch == "undefined" || this.branch == null || this.branch == "") {
      this.presentAlert("", "Please select Branch");
      return;
    } else {
      let data = {
        Function_id: parseInt(localStorage.getItem('FUNCTION_ID')),
        Branch_id: this.branch ? this.branch : 1,
        location: this.branchlocation ? this.branchlocation : 0,
        property_code: this.propertycode ? this.propertycode : 0,
        custname: this.customerName ? this.customerName : ' ',
        Status: this.status ? this.status : ' ',
        payMode: this.paymode ? this.paymode : ' ',
        chequeNo: this.chequeno ? this.chequeno : ' ',
        fromDate: 0,
        toDate: 0
      };
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpaymentdetailsreports/' + data.Function_id + '/' + data.Branch_id + '/' + data.location + '/' + data.property_code + '/' + data.custname + '/' + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.payMode + '/' + data.chequeNo, {
        headers: options,
      }).subscribe(resp => {
        this.getPaymentDetailsList = resp;
        console.log(this.getPaymentDetailsList);
        if (resp == null) {
          this.showdata = true;
        }
        else {
          this.showdata = false;
        }
      });
    }
  };


  getPaymentDetails() {

    this.user_id = window.localStorage['TUM_USER_ID'];
    this.Branch_id = window.localStorage['TUM_BRANCH_ID'];
    this.Function_id = window.localStorage['FUNCTION_ID'];
    this.user_type = window.localStorage['TUM_USER_TYPE'];


    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpaymentdetailsreports/' + this.Function_id + '/' + this.Branch_id + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0, {
      headers: options,
    }).subscribe(resp => {
      this.getPaymentDetailsList = resp;
      console.log(this.getPaymentDetailsList);
      if (resp == null) {
        // alert("hh")
        this.showdata = true;
      }
      else {
        // this.showdata = this.getPaymentDetailsList.length;
        this.showdata = false;
      }
    });
  };


  Getbranches() {

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getbranchid', {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = JSON.stringify(resp);
      this.branchlist = JSON.parse(this.branchlist);
      this.branchlist.forEach(element => {
        this.branchlist1.push(element);
        console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
      });
    }, error => {
    });
  };


  BranchLocationdata(branchid) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + branchid, {
      headers: options,
    }).subscribe(resp => {
      this.branchlocationlist = JSON.stringify(resp);
      this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  };

  getLocationdata(branchlocation) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));


    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branchlocation, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.customerlocation = resp;
      for (var i = 0; i < this.customerlocation.length; i++) {

        this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

      }
      console.log(this.locationcode1, 'fyttr');
    });
  };


  getPropertyCode(ev: any) {

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    console.log("one");
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log(this.companiesstr);

      // this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());
      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push(this.companiesstr[i].property_code);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });
  };

  addPropertycode(item: any) {

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    this.propertycode = item;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycode + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      this.propertyDesc = this.respContact[0]['property_building_name'];
      // this.contact1 = JSON.parse(this.respContact);
      // console.log(this.contact1);
      // if (this.contact1.length == 0) {
      //   this.presentAlert('Alert', 'Add company Contact Number!');

      // } else {

      //   this.contact_array = this.contact1;
      // }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  };

}
