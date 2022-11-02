/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { AdditionalChargesPage } from './additional-charges/additional-charges.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-additional-page',
  templateUrl: './additional-page.page.html',
  styleUrls: ['./additional-page.page.scss'],
})
export class AdditionalPagePage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string;
  showfilter: boolean = true;


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
  payDate: any;
  Pay_Date: any;
  ShowAddionalList: any = [];
  propDesc: any;
  showRecords: boolean;
  constructor(private modalCtrl: ModalController,
    private route: Router, public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe = new DatePipe("es-ES")) { }

  ngOnInit() {
    this.Getbranches();
    this.getListItems();

  }
  editCharge(item) {
    console.log(item);
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  async createModal() {

    const model = await this.modalCtrl.create({

      component: AdditionalChargesPage,
    });
    return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  }

  async newIssueCreate() {
    const model = await this.modalCtrl.create({
      component: PmsCreateIssuePage,
    });
    return await model.present();
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
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

  getListItems() {
    this.payDate = this.datePipe.transform(this.payDate, 'dd-MM-yyyy');

    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      Branch: 1,
      Location: 1,
      Property_code: 0,
      Description: this.propDesc ? this.propDesc : 0,
      Pay_Date: this.payDate ? this.payDate : 0
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertyadditionalcharger/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_code + "/" + data.Description + "/" + data.Pay_Date, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.ShowAddionalList = resp;
    });
  }
  filterListItems() {
    if (this.branch == "undefined" || this.branch == " " || this.branch == "<< Select >>" || this.branch == null) {
      this.presentAlert("", "Please select Branch");
    } else {
      console.log('123');
      this.payDate = this.datePipe.transform(this.payDate, 'dd-MM-yyyy');

      let data = {
        strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
        Branch: this.branch ? this.branch : 1,
        Location: this.branchlocation ? this.branchlocation : 1,
        Property_code: this.propertycode ? this.propertycode : 0,
        Description: this.propDesc ? this.propDesc : 0,
        Pay_Date: this.payDate ? this.payDate : 0
      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertyadditionalcharger/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_code + "/" + data.Description + "/" + data.Pay_Date, {
        headers: options,
      }).subscribe(resp => {
        console.log("location", resp);
        if (resp == null) {
          this.showRecords = true;
        } else {
          this.showRecords = false;
          this.ShowAddionalList = resp;
        }
      });
    }
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  };
}
