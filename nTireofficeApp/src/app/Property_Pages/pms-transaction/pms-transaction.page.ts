/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from '../table-sample.service';
import { RecieptMasterPagePage } from '../reciept-master-page/reciept-master-page.page';
import { IpaddressService } from '../../service/ipaddress.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pms-transaction',
  templateUrl: './pms-transaction.page.html',
  styleUrls: ['./pms-transaction.page.scss'],
  encapsulation: ViewEncapsulation.None
})



export class PmsTransactionPage implements OnInit {

  @ViewChild('rowDetailTpl', { static: true }) rowDetailTpl: TemplateRef<any>;

  options = { checkboxes: true };
  data: any = [];
  columns: any = [];
  rows: any;

  optionsWithRowDetail = {};
  dataWithRowDetail = [];
  columnsWithRowDetail: any = [];
  showfilter: boolean = true;
  branchlist1: any = [];
  branch: any;
  functionid: any;
  branchid: any;
  showAllrecords: any = [];


  branchlist: any;
  branchlocationlist: any = [];
  customerlocation: any;
  locationcode1: any[] = [];
  propertyCode1: any[];
  isPropertycodeAvailable: boolean;
  companiesstr: any;
  branchlocation: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  norecordsfound: boolean;
  branchId: any = [];
  getBID: any;
  get_Bid: any;
  loca_id: any;


  constructor(public alertController: AlertController, private router: Router, private IpaddressService: IpaddressService, private modalCtrl: ModalController, private http: HttpClient, private tableApi: TableSampleService) {
    // this.Getbranches();
    // console.log('this.branch ', this.branch);

    this.columns = [
      { name: 'Name', width: "110", sorting: true },
      { name: 'Company', width: "120" },
      { name: 'Genre', width: "110" },
    ];

    this.optionsWithRowDetail = {
      checkboxes: true,
      rowDetailTemplate: this.rowDetailTpl
    };

  }

  ngOnInit() {
    this.BranchLocationdata();
    // this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.getAllPaymentDetails();
    this.dataWithRowDetail = this.tableApi.getData();
    console.log(this.data);
    this.columnsWithRowDetail = [
      { name: 'Name', width: "110", sorting: true },
      { name: 'Company', width: "120" },
      { name: 'Genre', width: "110" },
    ];
  }

  async transCancel() {
    await this.modalCtrl.dismiss('', '');
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  async viewReciept(items) {
    debugger;
    console.log(items);

    this.router.navigate(['/reciept-master-page', items.property_id, items.rental_id]);
    // const model = await this.modalCtrl.create({

    //   component: RecieptMasterPagePage,
    // });
    // return await model.present();
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

  filterRecords() {
    if (this.branch == "undefined" || this.branch == null || this.branch == "") {
      this.presentAlert("", "Please select Branch");
      return;
    } else {
      debugger;
      const header = new Headers();
      header.append("Content-Type", "application/json");
      // if (this.branch == "undefined") {
      //   this.branchid = 1;
      // } else if (this.branchlocation == "undefined") {
      //   this.branchlocation = 1;
      // } else if (this.propertycode == "undefined") {
      //   this.propertycode = 1;
      // }
      let data = {
        functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
        branchid: this.branch ? this.branch : 1,
        locationid: this.branchlocation ? this.branchlocation : 1,
        strPropertyId: this.propertycode ? this.propertycode : 0,
        strPropertyDesc: 0,
        rentelCode: 0,
        strStatus: 0,
        pageIndex: 0,
        pageSize: 50,
        sortExpression: 0,
        alphaname: 0,
        Split_ID: 0,
        strusertype: parseInt(localStorage.getItem('TUM_USER_TYPE')),
        userid: parseInt(localStorage.getItem('TUM_USER_ID'))
      };

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getpaymentdetails' + '/' + data.functionid + '/' + data.branchid + '/' + data.locationid + '/' + data.strPropertyId + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
        headers: options,
      }).subscribe(resp => {
        this.showAllrecords = resp;
        if (resp == null) {
          this.norecordsfound = true;
        } else {
          this.norecordsfound = false;
        }
        // console.log('this.showAllrecords ', this.showAllrecords);

      }, error => {

        // console.log("showAllrecords : " + JSON.stringify(error));
      });
    }
  }
  getAllPaymentDetails() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      // branchid: parseInt(localStorage.getItem('TUM_BRANCH_ID')),
      branchid: 0,
      locationid: 0,
      strPropertyId: 0,
      strPropertyDesc: 0,
      rentelCode: 0,
      strStatus: 0,
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      Split_ID: 0,
      strusertype: parseInt(localStorage.getItem('TUM_USER_TYPE')),
      userid: parseInt(localStorage.getItem('TUM_USER_ID'))
    }

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getpaymentdetails' + '/' + data.functionid + '/' + data.branchid + '/' + data.locationid + '/' + data.strPropertyId + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
      headers: options,
    }).subscribe(resp => {
      this.showAllrecords = resp;
      // console.log('this.showAllrecords ', this.showAllrecords);

    }, error => {

      // console.log("showAllrecords : " + JSON.stringify(error));
    });
  }

  // Getbranches() {

  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getbranchid', {
  //     headers: options,
  //   }).subscribe(resp => {
  //     this.branchlist = JSON.stringify(resp);
  //     this.branchlist = JSON.parse(this.branchlist);
  //     this.branchlist.forEach(element => {
  //       this.branchlist1.push(element);
  //     });
  //   }, error => {
  //   });
  // };

  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 =resp;
      // this.branchlocationlist = JSON.stringify(resp);
      // this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchId.push(this.branchlist1[i].BRANCH_ID);
      }
    }, error => {
    });
  }



  getLocationdata(branch) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    this.get_Bid = branch;

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.branchlocationlist = resp;
      for (var i = 0; i < this.branchlocationlist.length; i++) {
        this.loca_id = this.branchlocationlist[i].LOCATION_ID;
      }
      // for (var i = 0; i < this.customerlocation.length; i++) {

      //   this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

      // }
      console.log(this.locationcode1, 'fyttr')
    })
  }
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

    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + data.loca_Id, {
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

    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      // this.propertyCode1 = [];
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
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getPropertycode/' + this.propertycode + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      this.propertyDesc = this.respContact[0]['property_building_name'];
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }


}
