/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-pms-list',
  templateUrl: './pms-list.page.html',
  styleUrls: ['./pms-list.page.scss'],
})
export class PmsListPage implements OnInit {
  username = window.localStorage.getItem('TUM_USER_NAME');
  name: string = '';
  filterTerm: string;
  showfilter: boolean = true;
  propertyBranch: any;
  userId: any;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  strFunctionId: any;
  strusertype: any;
  Propertycode: any;
  propertyCodeResult: any;
  params: { access_token: any; usertoken: any; USER_ID: any; };
  user: any;
  strBranchId: string;
  strLocationId: string;
  strPropertyId: string;
  strPropertyDesc: string;
  userid: any;
  branchid: any;
  branchID: string;
  propertyCodeResultLength: any;
  showdata: boolean;
  customerbranch: any;
  isItemAvailable: boolean = false;
  branchcode: any;
  customerlocation: any;
  locationcode1: any[] = [];
  locationcode: string;
  islocItemAvailable: boolean = false;
  selectbranch: any;
  contact_array = [];
  propertyCode1: any[];
  companiesstr: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  contact1: any;
  isPropertycodeAvailable: boolean = false;
  branchlist: any;
  branchlist1: any = [];
  branchlocationlist: any = [];
  branch: any;
  branchlocation: any;
  nodatafound: string;
  reportpropertylist: any;
  status: string;
  PropertyType: any;
  propertynature: any;
  propertydescription: any;
  fDate: any;
  tDate: any;
  status1: any;
  propertyType: any;
  propertyOwner: any;
  propertyNature: any;
  propertycodeDesc: any;
  branchId: any;
  getBID: any;
  get_Bid: any;
  loca_id: any;
  pmslistDataCount: any;
  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }
  ngOnInit() {
    this.branchcode = ('');
    this.locationcode = ('');
    this.BranchLocationdata();
    this.getpropertylistreport();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  };
  strBranchcode(strBranchcode: any) {
    throw new Error('Method not implemented.');
  };
  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchlist1[i].BRANCH_ID;
      }
    }, error => {
    });
  };
  getLocationdata(branch:any) {
    console.log(branch);
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    this.get_Bid = branch;
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
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
    };
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
  // total get
  getpropertylistreport() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      functionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      branchId: this.branch ? this.branch : 0,
      locationid: this.branchlocation ? this.branchlocation : 0,
      propertyCode: this.propertycode ? this.propertycode : 0,
      Propertydesc: this.propertydescription ? this.propertydescription : 0,
      fromdate: this.fDate ? this.fDate : 0,
      todate: this.tDate ? this.tDate : 0,
      status: this.status1 ? this.status1 : 0,
      PropertyType: this.propertyType ? this.propertyType : 0,
      PropertyOwner: this.propertyOwner ? this.propertyOwner : 0,
      PropertyNature: this.propertyNature ? this.propertyNature : 0,
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertylistreports/' + data.functionId + "/" + data.branchId + "/" + data.locationid + "/"
      + data.propertyCode + '/' + data.Propertydesc + '/' + data.fromdate + '/' + data.todate + '/' + data.status + '/' + data.PropertyType + '/' + data.PropertyOwner + '/' + data.PropertyNature, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "reportlist");

      this.reportpropertylist = res;

      this.pmslistDataCount = this.reportpropertylist.length;

      console.log("count",this.pmslistDataCount);
      

      if (this.reportpropertylist == null) {
        this.showdata = true;
      }
      else {
        this.showdata = false;
        this.pmslistDataCount;
      }
    });
  };

  filterpropertylistreport() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    let data = {
      functionID: localStorage.getItem('FUNCTION_ID'),
      branchid: this.branch ? this.branch : 1,
      locationid: this.branchlocation ? this.branchlocation : 1,
      propertyID: this.propertycodeDesc ? this.propertycodeDesc : 0,
      status: this.status ? this.status : 0,
      propertytype: this.PropertyType ? this.PropertyType : 0,
      propertynature: this.propertynature ? this.propertynature : 0,
    };
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertylistreports/' + data.functionID + "/" + data.branchid + "/" + data.locationid + "/" + data.propertyID + "/" + "0/0/0/" + data.status + "/" + data.propertytype + "/0" + "/" + data.propertynature, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "reportlist");
      this.reportpropertylist = res;
      if (this.reportpropertylist == null) {
        this.showdata = true;
      }
      else {
        this.showdata = false;
      }
    });
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }
}
