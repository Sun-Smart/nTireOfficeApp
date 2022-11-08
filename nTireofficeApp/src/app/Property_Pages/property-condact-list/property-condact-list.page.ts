/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';


@Component({
  selector: 'app-property-condact-list',
  templateUrl: './property-condact-list.page.html',
  styleUrls: ['./property-condact-list.page.scss'],
})
export class PropertyCondactListPage implements OnInit {
  showfilter: boolean = true;
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
  showdata: any;
  propetycondactlist: any;
  branchID: any;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  propertycodeDesc: any;
  branchid: any;
  get_Bid: any;
  loca_id: any;
  branchId: any;
  getBID: any;
  showRecords: boolean;
  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }
  ngOnInit() {
    this.getpropertycondactlist();
    this.BranchLocationdata();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  };
  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + '/' + userId, {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + '/' + branch, {
      headers: options,
    }).subscribe(resp => {
      console.log('location', resp);
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
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + '/' + data.strFunctionId + '/' + data.branch_Id + '/' + data.loca_Id, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp);
    }, error => {
      console.log('error : ' + JSON.stringify(error));
    });
  };

  getPropertyCode(ev: any) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    this.propertyCode1 = [];
    if (ev.target.value == '') {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + '/' + strFunctionId + '/' + this.branch + '/' + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log(this.companiesstr);
      if (this.companiesstr == 'No data found') {
        console.log('check pr code');
        this.companiesstr = '';
      } else {
        console.log('is available');
      }
      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push({
          property_code: this.companiesstr[i].property_code,
          binding: this.companiesstr[i].property_code + '-' + this.companiesstr[i].property_building_name
        });
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
      console.log('error : ' + JSON.stringify(error));
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
    };
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycodeDesc + '/' + data.functionid + '/' + data.branchids + '/' + data.locationid, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);
      this.propertyDesc = this.respContact[0]['property_building_name'];
    }, error => {
      console.log('error : ' + JSON.stringify(error));
    });
  }
  // total get
  getpropertycondactlist() {
    let data = {
      functionID: this.functionID ? this.functionID : 0,
      branchID: 0,
      strPropertyCode: 0,
      strPropertyDesc: 0,
    };
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertycontactlistreport/' + data.functionID + '/' + data.branchID + '/' + data.strPropertyCode + '/' + data.strPropertyDesc, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, 'reportlist');
      this.propetycondactlist = res;
      if (this.propetycondactlist == null) {
        this.showdata = 'No Data Found';
      }
      else {
        this.showdata = this.propetycondactlist.length;
      }
    });
  }
  filterpropertycondactlist() {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    let data = {
      functionID: localStorage.getItem('FUNCTION_ID'),
      branchid: this.branch ? this.branch : 1,
      propertyID: this.propertycode ? this.propertycode : 0,
    };
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertycontactlistreport/' + data.functionID + '/' + data.branchid + '/' + data.propertyID + '/0', {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp, 'reportlist');
      this.propetycondactlist = [];
      this.propetycondactlist = resp;
      if (resp == null) {
        this.showRecords = true;
      } else {
        this.showRecords = false;
        this.propetycondactlist = resp;
      }
    });
  }
}
