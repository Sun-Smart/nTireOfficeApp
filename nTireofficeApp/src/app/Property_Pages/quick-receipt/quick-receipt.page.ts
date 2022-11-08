/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IpaddressService } from '../../service/ipaddress.service';

@Component({
  selector: 'app-quick-receipt',
  templateUrl: './quick-receipt.page.html',
  styleUrls: ['./quick-receipt.page.scss'],
})
export class QuickReceiptPage implements OnInit {
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
  quickreceipt: any = [];
  showdata: string;
  branchID: string;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  showError: boolean;
  branchId: any = [];
  getBID: any;
  loca_id: any;
  get_Bid: any;


  constructor(
    private route: Router,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }

  ngOnInit() {
    // this.branchcode = ('')
    // this.locationcode = ('')
    this.BranchLocationdata();
    this.getquicreceipt();

  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  // Getbranches() {

  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress1  + this.Ipaddressservice.serviceurlProperty + 'getbranchid', {
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
  // BranchLocationdata(branchid) {
  //   let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress1  + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + branchid, {
  //     headers: options,
  //   }).subscribe(resp => {
  //     this.branchlocationlist = JSON.stringify(resp);
  //     this.branchlocationlist = JSON.parse(this.branchlocationlist);
  //     console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));

  //   }, error => {

  //     console.log("branchlist1 : " + JSON.stringify(error));
  //   });
  // };


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
      console.log(this.locationcode1, 'fyttr');
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
    console.log('data ', data);

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
  // total get


  getquicreceipt() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'quickrecipt/' + this.functionID + "/" + 0 + "/" + 0 + '/' + 0, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "reportlist");
      this.quickreceipt = res;


      if (this.quickreceipt == "No data found") {
        this.quickreceipt = [];
        this.showError = true;
      } else {
        this.showError = false;
      }

    });

  }



  filterquickreceipt() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    let data = {
      functionID: localStorage.getItem('FUNCTION_ID'),
      branchid: this.branch ? this.branch : 1,
      locationid: this.branchlocation ? this.branchlocation : 1,
      propertyID: this.propertycode ? this.propertycode : 0,


    };
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'quickrecipt/' + data.functionID + "/" + data.locationid + "/" + data.propertyID + "/" + "0", {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "reportlist");
      this.quickreceipt = res;

      if (res == "No data found") {

        this.quickreceipt = [];
        // this.arra.push(this.ShowAddionalList)
        // console.log(this.arra);

        this.showdata = "No Data Found";
      } else {
        this.showdata = this.quickreceipt.length;
      }

    });

  }


}
