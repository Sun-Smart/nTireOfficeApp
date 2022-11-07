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

  //  filter Branch, Location & property code,

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
  showdata: string;
  assetData: any[];
  assetCodeBinding: any;
  ASSET_CODE : any;
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



  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,
    private activatedRoute: ActivatedRoute) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    // this.branch = localStorage.getItem('TUM_BRANCH_CODE');
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

  getLocationdata(branch:any) {
    console.log(branch);
    
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

      // set val to the value of the searchbar

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });

  };

  getPropertyCode(ev: any) {

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    // console.log("one");
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
          binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name
        });
      };
      // for (var i = 0; i < this.companiesstr.length; i++) {
      //   this.propertyCode1.push(this.companiesstr[i].property_code);
      // }
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
      branchids: this.branchid ? this.branchid : 1,
      locationid: this.branchlocation ? this.branchlocation : 1,
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

  taskDetails() {
    debugger
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch: this.branchid ? this.branchid : 0,
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
      PropCode: this.PrCode ? this.PrCode : 0,
      PropDesc: this.PrDesc ? this.PrDesc : 0,
      strCriticality: 0,
      assetName: this.assetname ? this.assetname : 0,
      actmaintenence: 0,
      wrkordno: 0,
    };

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/'+ data.functionid + '/'+ data.branch + '/'+ data.Mode + '/'
    + data.fromDate + '/'+ data.toDate + '/'+ data.Status + '/'+ data.dept + '/'+ data.asset_code + '/'+ data.strUserId + '/'+ data.UserType + '/'
    + data.pageIndex + '/'+ data.pageSize + '/'+ data.sortExpression + '/'+ data.alphaname + '/'+ data.drpcategory + '/'+ data.drptype + '/'+ data.TASKTYPE + '/'
    + data.PropCode + '/'+ data.PropDesc + '/'+ data.strCriticality + '/'+ data.assetName + '/'+ data.actmaintenence + '/'
    + data.wrkordno, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);

      this.myTaskDetailsList = resp;

      console.log(this.myTaskDetailsList);
      for (var i = 0; i < this.myTaskDetailsList.length; i++) {
        this.pmr_reference = this.myTaskDetailsList[i]['pmr_asset_reference'];
      };
      console.log('kuhgg', this.pmr_reference);
    });

    if (this.myTaskDetailsList== null) {

      this.showdata = "0";
    }
    else {
      this.showdata = this.myTaskDetailsList.length;
    }
  };




  filterMyTask() {

      const header = new Headers();
      header.append("Content-Type", "application/json");

      let data = {
        functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
        branchid: parseInt(localStorage.getItem('TUM_BRANCH_ID')),
        Mode: this.mode ? this.mode : 0,
        fromDate: this.fdate ? this.fdate : 0,
        toDate: this.tdate ? this.tdate : 0,
        Status: 0,
        dept: 0,
        asset_code: this.assetCodeBinding ? this.assetCodeBinding :0 ,
        strUserId: 0,
        UserType: 0,
        pageIndex: 0,
        pageSize: 50,
        sortExpression: 0,
        alphaname: 0,
        drpcategory: 0,
        drptype: 0,
        TASKTYPE: 0,
        PropCode: this.PrCode ? this.PrCode : 0,
        PropDesc: this.PrDesc ? this.PrDesc : 0,
        strCriticality: 0,
        assetName: this.assetname ? this.assetname : 0,
        actmaintenence: 0,
        wrkordno: 0,
      };

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/'+ data.functionid + '/' + data.branchid + '/'+ data.Mode + '/'
      + data.fromDate + '/'+ data.toDate + '/'+ data.Status + '/'+ data.dept + '/'+ data.asset_code + '/'+ data.strUserId + '/'
      + data.UserType + '/'+ data.pageIndex + '/'+ data.pageSize + '/'+ data.sortExpression + '/'+ data.alphaname + '/'+ data.drpcategory + '/'
      + data.drptype + '/'+ data.TASKTYPE + '/'+ data.PropCode + '/'+ data.PropDesc + '/'+ data.strCriticality + '/'+ data.assetName + '/'+ data.actmaintenence + '/'
      + data.wrkordno, {
        headers: options,
      }).subscribe((resp: any) => {
        console.log(resp);
        this.myTaskDetailsList = resp;

        console.log(this.myTaskDetailsList);

        for (var i = 0; i < this.myTaskDetailsList.length; i++) {
          this.pmr_reference = this.myTaskDetailsList[i]['pmr_asset_reference'];
        };


      });
  };

  updateStatus() {
    debugger;
    this.getTaskStatus = this.status1
    console.log("getTaskStatus,,,,,,,,,,,,,,",this.getTaskStatus);
    if (this.getTaskStatus == "undefined" || this.getTaskStatus == null || this.getTaskStatus == "") {
      this.presentAlert1("", "Please select Issue Status...");
      return;
    } else {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      status: this.getTaskStatus,
      pmr_reference: this.pmr_reference,
    };

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'mytaskstatusupdate/', data, {
      headers: options,
    }).subscribe((resp: any) => {
      this.updateStatusRes = resp;
      console.log(this.updateStatusRes);
      this.presentAlert("Success", "Status Updated Sucessfully...");
    })
  };
}
}
