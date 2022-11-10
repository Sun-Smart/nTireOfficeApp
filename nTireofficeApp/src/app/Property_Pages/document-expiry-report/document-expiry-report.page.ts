/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document-expiry-report',
  templateUrl: './document-expiry-report.page.html',
  styleUrls: ['./document-expiry-report.page.scss'],
})
export class DocumentExpiryReportPage implements OnInit {
  branchID: string;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  getBID: any;
  branchId: any;
  get_Bid: any;
  loca_id: any;
  propertycodeDesc: any;
  branchid: any;
  transform(value: string) {
    this.datePipe = new DatePipe("en-US");
    value = this.datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }
  showfilter: boolean = true;
  showdata: boolean;
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
  fromdate: any;
  todate: any;
  clientname: string;
  getdocumentexpiryList: any;
  issuedate: any;
  expirydate: any;

  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe = new DatePipe("es-ES")) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }
  ngOnInit() {
    this.getdocumentexpiryreport();
    this.BranchLocationdata();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  };
  getdocumentexpiryreport() {
    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      user_id: parseInt(localStorage.getItem('TUM_USER_ID')),
      branchid: 0,
      propertycode: 0,
      issuedate: 0,
      expirydate: 0,
      clientcode: 0,
      clientname: 0
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getdocumentexpiryreport/' + data.functionid + '/' + data.branchid + '/' + data.propertycode + '/' + data.issuedate + '/' + data.expirydate + '/' + data.clientcode + '/' + data.clientname, {
      headers: options,
    }).subscribe(resp => {
      this.getdocumentexpiryList = resp;
      console.log(this.getdocumentexpiryList);

      if (this.getdocumentexpiryList == null) {
        this.showdata = true;
      }
      else {
        this.showdata = false;
      }
    });
  }
  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchId.push(this.branchlist1[i].BRANCH_ID);
      }
      console.log('getBID', this.getBID);
    }, error => {
    });
  };
  getLocationdata(branch: any) {
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
    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      propertyCode: 0,
      branch_Id: this.get_Bid,
      loca_Id: this.loca_id
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + data.loca_Id, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp);
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };

  getPropertyCode(ev: any) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
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
        debugger
        this.propertyCode1 = [];
        this.showdata = true;
      } else {
        this.showdata = false;
      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push({
          property_code: this.companiesstr[i].property_code,
          binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name
        });
      };
    };
      const val = ev.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };
  addPropertycode(item: any) {
    this.propertycode = item.binding;
    this.propertycodeDesc = item.property_code;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };
    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branchids: this.branchid ? this.branchid : 0,
      locationid: this.branchlocation ? this.branchlocation : 0,
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycodeDesc + "/" + data.functionid + "/" + data.branchids + "/" + data.locationid, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);
      this.propertyDesc = this.respContact[0]['property_building_name'];
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }
  filterdocumentexpiryreport() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    let data = {
      functionID: localStorage.getItem('FUNCTION_ID'),
      branchid: this.branch ? this.branch : 0,
      propertyID: this.propertycodeDesc ? this.propertycodeDesc : 0,
      clientname: this.clientname ? this.clientname : 0,
    };
    this.fromdate = this.datePipe.transform(this.fromdate, 'dd-MM-yyyy')
    this.todate = this.datePipe.transform(this.todate, 'dd-MM-yyyy'),
      this.issuedate = this.fromdate ? this.fromdate : 0
    this.expirydate = this.todate ? this.todate : 0
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getdocumentexpiryreport/' + data.functionID + '/' + data.branchid + '/' + data.propertyID + '/' + this.issuedate + "/" + this.expirydate + '/' + 0 + '/' + data.clientname, {
      headers: options,
    }).subscribe(resp => {
      this.getdocumentexpiryList = resp;
      if (this.getdocumentexpiryList == null) {
        this.showdata = true
      }
      else {
        this.showdata = false
      }
    });
  }
}
