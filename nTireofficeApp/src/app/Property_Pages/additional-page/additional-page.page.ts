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
  showError: boolean;
  showReceipt: any = [];
  rentalID: any;
  property_id: string;
  rental_pro_id: any;
  rent_code_ID: any;
  propertycodeDesc: any;
  branchId: any = [];
  getBID: any;
  loca_id: any;
  get_Bid: any;
  constructor(private modalCtrl: ModalController,
    private router: Router, public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe = new DatePipe("es-ES")) {
  }

  ngOnInit() {
    // this.Getbranches();
    this.getListItems();
    this.BranchLocationdata();
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
    this.getListItems();
  };

  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      // this.branchlocationlist = JSON.stringify(resp);
      // this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchId.push(this.branchlist1[i].BRANCH_ID);
      }
      console.log('getBID', this.getBID);

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  };


  getLocationdata(branch) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    this.get_Bid = branch;
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.customerlocation = resp;
      for (var i = 0; i < this.customerlocation.length; i++) {
        this.loca_id = this.customerlocation[i].LOCATION_ID;
      }
    });
  };

  newPropertyCode(branchlocation) {

    const header = new Headers();
    header.append("Content-Type", "application/json");


    let options = new HttpHeaders().set('Content-Type', 'application/json');

    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      propertyCode: 0,
      branch_Id: this.get_Bid,
      loca_Id: this.loca_id
    };

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + data.loca_Id, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp);

      // set val to the value of the searchbar

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });

  }

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
        // this.propertyCode1.push(this.companiesstr[i].property_code);
        this.propertyCode1.push({
          property_code: this.companiesstr[i].property_code, 
          binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name,
          rental_pro_id: this.companiesstr[i].property_id
        });
      };
      // for (var i = 0; i < this.companiesstr.length; i++) {
      //   this.propertyCode1.push(this.companiesstr[i].property_code);
      // }
      console.log('this.rental_pro_id ', this.rental_pro_id);

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

    this.propertycode = item.binding;
    this.rental_pro_id = item.rental_pro_id;
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertyrent/' + strFunctionId + "/" + this.branch + "/" + this.branchlocation + "/" + this.rental_pro_id, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      // this.propertyDesc = this.respContact[0]['property_building_name'];
      this.rentalID = this.respContact[0]['rental_id'];
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
  // showmore(idvalue) {
  //   //        alert(idvalue);
  //   $("#dividvalsp" + idvalue).css("display", "block");
  //   $("#imageidvalsp" + idvalue).hide();
  // }
  // showless(idvalue) {
  //   //        alert(idvalue);
  //   $("#dividvalsp" + idvalue).css("display", "none");
  //   $("#imageidvalsp" + idvalue).show();
  // };
  viewReciept(item: any) {
    console.log(item);

    this.router.navigate(['/additionallist', item.PROPERTY_ID]);
  }
  // showmore(i) {
  //   this.getReceipt(i);
  // }
  // showless(idvalue) {
  //   //        alert(idvalue);
  //   $("#dividvalsp" + idvalue).css("display", "none");
  //   $("#imageidvalsp" + idvalue).show();
  // };
  getReceipt(i: any) {
    console.log('property grid ', i);

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalchargegrid/' + i.PROPERTY_ID, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.showReceipt = resp;
      // if (resp == null) {
      //   this.showError = true;
      // } else {
      //   this.showError = false;
      //   this.ShowAddionalList = resp;
      // }
    });
  }

  getListItems() {
    this.payDate = this.datePipe.transform(this.payDate, 'dd-MM-yyyy');

    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      Branch: 0,
      Location: 0,
      Property_ID: 0,
      rent_ID: 0
      // Description: this.propDesc ? this.propDesc : 0,
      // Pay_Date: this.payDate ? this.payDate : 0
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalcharges/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_ID + "/" + data.rent_ID, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);

      if (resp == null) {
        this.showError = true;
      } else {
        this.showError = false;
        this.ShowAddionalList = resp;
      }
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
        Property_code: this.rental_pro_id ? this.rental_pro_id : 0,
        rent: this.rentalID ? this.rentalID : 1
        // Description: this.propDesc ? this.propDesc : 0,
        // Pay_Date: this.payDate ? this.payDate : 0
      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalcharges/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_code + "/" + data.rent, {
        headers: options,
      }).subscribe(resp => {
        this.ShowAddionalList = [];
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
