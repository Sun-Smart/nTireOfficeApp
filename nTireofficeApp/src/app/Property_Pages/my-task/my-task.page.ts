/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-debugger */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.page.html',
  styleUrls: ['./my-task.page.scss'],
})
export class MyTaskPage implements OnInit {


  showfilter: boolean = true;
  isItemAvailable: boolean;
  function: any;
  branch: any;
  userID: any;
  usertype: any;
  userToken: any;
  accessToken: any;
  branchID: any;
  functionID: any;
  username: any;
  branchlist1: any = [];
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
  isRecordShow: Boolean;
  mode: any;
  fromDate: any;
  toDate: any;
  fdate: any;
  tdate: any;
  PrDesc: any;
  PrCode: any;
  assetname: any;
  myTaskDetailsList: any;
  showAllrecords: any = [];
  status: any;
  pmr_reference: any;
  updateStatusRes: any;
  assetCode: any;
  assetCode1: any[];
  getBranch: any;
  branchid: any;
  pmm_asset_code: any;
  status1: any;
  getTaskStatus: any;
  showdata: boolean;
  assetData: any[];
  assetCodeBinding: any;
  ASSET_CODE: any;
  assetDesc: any;
  department: any;
  assetid: any;
  assetownerid: any;
  gatagory: any;
  subGatagory: any;
  user_id: any;
  user_type: any;
  asset_refNo: any;
  asset_codeNumber: any;
  getBID: any;
  branchId: any;
  loca_id: any;
  get_Bid: any;
  propertycodeDesc: any;
  assetCodeList: any;
  assetCodeDesc: any;
  assetcode: any;
  asset_code: any;
  respAsset: any;
  AssetCode: any;
  get_assetData: any;
  filter_asset: any;
  showdata1: boolean;
  pmr_referenceid: any;
  taskDetailsLength: any;

  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,
    private activatedRoute: ActivatedRoute) {
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
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

  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  };
  ngOnInit() {
    this.BranchLocationdata();
    this.taskDetails();
  };
  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
    }, error => {
      console.log("branchlist1 : " + JSON.stringify(error));
    });
  };

  getAssetdata(branch: any) {

    console.log(branch);

    this.get_Bid = branch;

    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch_Id: this.get_Bid,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      asset_code: 0,
      strUserId: 0,
      UserType: 0,
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      drpcategory: 0,
      drptype: 0,
      TASKTYPE: 0,
      PropCode: 0,
      PropDesc: 0,
      strCriticality: 0,
      assetName: 0,
      actmaintenence: 0,
      wrkordno: 0,
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.strFunctionId + '/' + data.branch_Id + '/' + data.Mode + '/'
      + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/' + data.asset_code + '/' + data.strUserId + '/' + data.UserType + '/'
      + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/' + data.drptype + '/' + data.TASKTYPE + '/'
      + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/'
      + data.wrkordno, {
      headers: options,
    }).subscribe(resp => {
      this.get_assetData = resp;
      console.log(this.get_assetData);
      // if (resp == null) {
      //   this.get_assetData = [];
      //   this.myTaskDetailsList = [];
      //   this.showdata = true;
      // } else {
      //   this.get_assetData = resp;
      //   this.showdata = false;
      // }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };


  // getAssetCode() {

  // let data = {
  //   strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
  //   branch_Id: this.get_Bid  ? this.get_Bid  : 0,
  //   Mode: this.mode ? this.mode : 0,
  //   fromDate: this.fdate ? this.fdate : 0,
  //   toDate: this.tdate ? this.tdate : 0,
  //   Status: 0,
  //   dept: 0,
  //   asset_code: 0,
  //   strUserId: 0,
  //   UserType: 0,
  //   pageIndex: 0,
  //   pageSize: 50,
  //   sortExpression: 0,
  //   alphaname: 0,
  //   drpcategory: 0,
  //   drptype: 0,
  //   TASKTYPE: 0,
  //   PropCode: 0,
  //   PropDesc: 0,
  //   strCriticality: 0,
  //   assetName: 0,
  //   actmaintenence: 0,
  //   wrkordno: 0,
  // };
  // console.log(data.branch_Id)

  // const header = new Headers();
  // header.append("Content-Type", "application/json");
  // let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.strFunctionId + '/' + data.branch_Id + '/' + data.Mode + '/'
  //   + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/' + data.asset_code + '/' + data.strUserId + '/' + data.UserType + '/'
  //   + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/' + data.drptype + '/' + data.TASKTYPE + '/'
  //   + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/'
  //   + data.wrkordno, {
  //   headers: options,
  // }).subscribe(resp => {
  //   this.isPropertycodeAvailable = false;

  //   this.AssetCode = resp;
  //   console.log(this.AssetCode);

  //   for (var i = 0; i < this.AssetCode.length; i++) {
  //     this.assetCode1.push({
  //       assetcode: this.AssetCode[i].pmm_asset_code,
  //       binding: this.AssetCode[i].pmm_asset_code + "-" + this.getAssetCode[i].pmm_asset_desc
  //     });
  //   };

  //   console.log(this.assetCode1);
  // }, error => {
  //   // console.log("error : " + JSON.stringify(error));
  // });
  // };

  addAssetCode(item: any) {
    console.log(item);

    this.filter_asset = item;
  };

  taskDetails() {
    debugger;
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch_Id: 0,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      asset_code: 0,
      strUserId: 0,
      UserType: 0,
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      drpcategory: 0,
      drptype: 0,
      TASKTYPE: 0,
      PropCode: 0,
      PropDesc: 0,
      strCriticality: 0,
      assetName: 0,
      actmaintenence: 0,
      wrkordno: 0,
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.strFunctionId + '/' + data.branch_Id + '/' + data.Mode + '/'
      + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/' + data.asset_code + '/' + data.strUserId + '/' + data.UserType + '/'
      + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/' + data.drptype + '/' + data.TASKTYPE + '/'
      + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/'
      + data.wrkordno, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);

      this.myTaskDetailsList = resp;
      console.log(this.myTaskDetailsList);


      for (var i = 0; i < this.myTaskDetailsList.length; i++) {
        this.pmr_referenceid = this.myTaskDetailsList[i].pmr_reference;
      };



      // if (resp == null || resp == "No data found") {
      //   this.myTaskDetailsList = [];
      //   this.showdata1 = true;
      // } else {
      //   this.showdata1 = false;
      //   console.log(this.myTaskDetailsList);
      // };
      console.log('kuhgg', this.pmr_referenceid);
    });
  };

  filterMyTask() {
    if (this.branch == "<< Select >>" || this.branch == null || this.branch == "undefined") {
      this.presentAlert1('Error', 'Please select branch');
      return;
    } else {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let data = {
        strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
        branch_Id: this.get_Bid ? this.get_Bid : 0,
        Mode: this.mode ? this.mode : 0,
        fromDate: this.fdate ? this.fdate : 0,
        toDate: this.tdate ? this.tdate : 0,
        Status: 0,
        dept: 0,
        asset_code: this.filter_asset ? this.filter_asset : 0,
        strUserId: 0,
        UserType: 0,
        pageIndex: 0,
        pageSize: 50,
        sortExpression: 0,
        alphaname: 0,
        drpcategory: 0,
        drptype: 0,
        TASKTYPE: 0,
        PropCode: 0,
        PropDesc: this.PrDesc ? this.PrDesc : 0,
        strCriticality: 0,
        assetName: 0,
        actmaintenence: 0,
        wrkordno: 0,
      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.strFunctionId + '/' + data.branch_Id + '/' + data.Mode + '/'
        + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/' + data.asset_code + '/' + data.strUserId + '/'
        + data.UserType + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/'
        + data.drptype + '/' + data.TASKTYPE + '/' + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/'
        + data.wrkordno, {
        headers: options,
      }).subscribe((resp: any) => {
        console.log(resp);
        this.myTaskDetailsList = resp;
        console.log(this.myTaskDetailsList);
        if (resp == null || resp == "No data found") {
          this.myTaskDetailsList = [];
          this.showdata1 = true;
        } else {
          this.showdata1 = false;
          this.myTaskDetailsList = resp;
        }
      });
    }
  };

  updateStatus() {
    debugger;
    // this.getTaskStatus = this.status1;
    console.log("getTaskStatus,,,,,,,,,,,,,,", this.status1);
    if (this.status1 == "undefined" || this.status1 == null || this.status1 == "") {
      this.presentAlert1("", "Please select Issue Status...");
      return;
    } else {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let data = {
        status: this.status1,
        pmr_reference: this.pmr_referenceid,
      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'mytaskstatusupdate/', data, {
        headers: options, responseType: 'text'
      }).subscribe((resp: any) => {
        this.updateStatusRes = resp;
        if (resp) {
          console.log(this.updateStatusRes);
          this.presentAlert("Success", "Status Updated Sucessfully");
        }
      });
    };
  }
}
