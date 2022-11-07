/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../../service/ipaddress.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-additional-charges',
  templateUrl: './additional-charges.page.html',
  styleUrls: ['./additional-charges.page.scss'],
})
export class AdditionalChargesPage implements OnInit {
  showView: boolean = false;
  branchlist1: any = [];
  customerlocation: any = [];
  locationcode1: any = [];
  branchlocationlist: any =[];
  branchlist: any;
  respContact: any;
  propertyDesc: any;
  propertycode: string;
  companiesstr: any;
  property_code: any;
  isPropertycodeAvailable: boolean;
  branch: string;
  branchlocation: string;
  propertyCode1: any;
  property_desc: any;
  payAmount: string;
  payDate: string;
  dataStatus: any;
  status: any;
  propertyid: any;
  flag: any;
  rentid: any;
  propertySplitid: any;
  rentalID: any;
  rental_pro_id: any;
  getBID: any;
  branchId: any =[];
  get_Bid: any;
  loca_id: any;


  constructor(private model: ModalController, private router: Router, public Ipaddressservice: IpaddressService, public alertController: AlertController, private modalCtrl: ModalController, private http: HttpClient,) { }

  ngOnInit() {
    this.BranchLocationdata();
  }
  submit() {
    debugger;
    this.showView = true;

  }
  cancel() {
    this.model.dismiss();
  }
  // Getbranches() {

  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getbranchid', {
  //     headers: options,
  //   }).subscribe(resp => {
  //     this.branchlist = JSON.stringify(resp);
  //     this.branchlist = JSON.parse(this.branchlist);
  //     this.branchlist.forEach(element => {
  //       this.branchlist1.push(element);
  //       console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
  //     });
  //   }, error => {
  //   });
  // };
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
      this.branchlocationlist = resp;
      for (var i = 0; i < this.branchlocationlist.length; i++) {
        this.loca_id = this.branchlocationlist[i].LOCATION_ID;
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
      // this.property_desc = this.companiesstr['property_desc'];
      console.log(this.companiesstr);
      if (this.companiesstr == "No data found") {
        console.log('check pr code');
        this.companiesstr = "";
      }else{
        console.log('is available');
      }
      // this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());
      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push(this.companiesstr[i].property_code);
        this.rental_pro_id = this.companiesstr[i]['property_id'];
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
  createAdditional() {
    if (this.branch == "<< Select >>" || this.branchlocation == "<< Select >>" || (this.propertycode == "" || this.propertycode == "undefined" || this.propertycode == null) || (this.property_desc == "" || this.property_desc == "undefined" || this.property_desc == null) || (this.payAmount == "" || this.payAmount == "undefined" || this.payAmount == null) || (this.payDate == "" || this.payDate == "undefined" || this.payDate == null)) {
      this.presentAlert("", "Please enter all fields");
    } else {
      const header = new Headers().set('Content-Type', 'text/plain; charset=utf-8');

      let data = {
        "propertyid": this.rental_pro_id ? this.rental_pro_id : "0",
        "DAMAGE_DESCRIPTION": this.property_desc ? this.property_desc : "0",
        "AMOUNT": this.payAmount ? this.payAmount : 0,
        "status": this.status ? this.status : "P",
        "FLAG": this.flag ? this.flag : "P",
        "DUE_DATE": this.payDate ? this.payDate : 0,
        "functionid": parseInt(localStorage.getItem('FUNCTION_ID')),
        "branchid": parseInt(this.branch) ? parseInt(this.branch) : 1,
        "locationid": parseInt(this.branchlocation) ? parseInt(this.branchlocation) : 0,
        "rentid": this.rentalID ? this.rentalID : "1",
        "userid": parseInt(localStorage.getItem('TUM_USER_ID')),
        "PROPERTYSPLITID": this.propertySplitid ? this.propertySplitid : "0"

      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'insertadditionalcharges', data, {
        headers: options, responseType: 'text'
      }).subscribe(resp => {
        // this.dataStatus = JSON.parse(resp);
        this.presentAlert1("success", resp);
        console.log(this.dataStatus);
        this.cancelBtn();
        this.router.navigate(['/additional-page']);
        // this.presentAlert("Success", "Issue Raised Sucessfully.. Issue Ref Number :");
      }, (error => {
        console.log(error);
      }));
    }
  }
  cancelBtn() {
    this.branch = "undefined";
    this.branchlocation = "undefined";
    this.propertycode = "";
    this.property_desc = "";
    this.rentalID = "";
    this.payAmount = "";
    this.payDate = "MM/DD/YYYY";
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
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  };
}
