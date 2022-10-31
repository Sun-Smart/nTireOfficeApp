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
  transform(value: string) {
    this.datePipe = new DatePipe("en-US");
     value = this.datePipe.transform(value, 'dd/MM/yyyy');
     return value;
 }

  showfilter: boolean = true;
  showdata: any;

  // filter Branch, Location & property code,

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
  todate:any;
  clientname: string;

  user_type: any;
  Function_id: any;
  Branch_id: any;
  user_id: any;

  getdocumentexpiryList: any;
  issuedate: any;
  expirydate: any;

  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe = new DatePipe("es-ES")) {
      
     }

  ngOnInit() {
    this.Getbranches();
    this.getdocumentexpiryreport();
  }
  togglefilter() {
    this.showfilter = !this.showfilter
  };

  getdocumentexpiryreport() {

    this.user_id = window.localStorage['TUM_USER_ID'];
    this.Branch_id = window.localStorage['TUM_BRANCH_ID'];
    this.Function_id = window.localStorage['FUNCTION_ID'];
    this.user_type = window.localStorage['TUM_USER_TYPE'];


    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getdocumentexpiryreport/' + this.Function_id + '/' + this.Branch_id + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0, {
      headers: options,
    }).subscribe(resp => {

      this.getdocumentexpiryList = resp;
      console.log(this.getdocumentexpiryList);

      if (this.getdocumentexpiryList == null) {

        this.showdata = "No Data Found"
      }
      else {
        this.showdata = this.getdocumentexpiryList.length;
      }
    });

  }
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
      this.customerlocation = resp
      for (var i = 0; i < this.customerlocation.length; i++) {

        this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

      }
      console.log(this.locationcode1, 'fyttr')
    })
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

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertycodebybranch/' + ev.target.value + "/" + strFunctionId + "/" + this.branch , {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertycodebybranch/' + this.propertycode + "/" + strFunctionId + "/" + this.branch , {
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


  filterdocumentexpiryreport() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    let data ={
      functionID: localStorage.getItem('FUNCTION_ID'),
      branchid: this.branch ? this.branch : 1,
      propertyID: this.propertycode ? this.propertycode : 0,
      // fromdate: this.fromdate ? this.fromdate : 1,
      // todate: this.todate ? this.todate : 1,
      clientname: this.clientname ? this.clientname : 0,
   
    }
    
    this.fromdate=this.datePipe.transform(this.fromdate, 'dd-MM-yyyy') 
    this.todate=this.datePipe.transform(this.todate, 'dd-MM-yyyy') ,

    this.issuedate=this.fromdate ? this.fromdate:0
    this.expirydate=this.todate ? this.todate:0

    console.log(this.fromdate,"date");
    console.log(this.issuedate,"datee");
    
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getdocumentexpiryreport/' + data.functionID + '/' + data.branchid+ '/' +data.propertyID + '/' +  this.issuedate + "/" +   this.expirydate +  '/' + 0 + '/' + data.clientname, {
      headers: options,
    }).subscribe(resp => {

      this.getdocumentexpiryList = resp;
      console.log(this.getdocumentexpiryList);

      if (this.getdocumentexpiryList == null) {

        this.showdata = "No Data Found"
      }
      else {
        this.showdata = this.getdocumentexpiryList.length;
      }
    });

  }

}
