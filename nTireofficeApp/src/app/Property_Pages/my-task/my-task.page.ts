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
    // this.branchID = localStorage.getItem('TUM_BRANCH_ID');
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


    this.Getbranches();
    this.taskDetails();
  };


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
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch: this.branchid ? this.branchid : 1,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      tag: 0,
      strUserId: 0,
      UserType: parseInt(localStorage.getItem('TUM_USER_TYPE')),
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

    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.functionid + '/' + data.branch + '/' + data.Mode + '/' + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/'
      + data.tag + '/' + data.strUserId + '/' + data.UserType + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/'
      + data.drptype + '/' + data.TASKTYPE + '/' + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/' + data.wrkordno, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);

      this.getBranch = resp;

      console.log(this.getBranch);

    });
  }

  // getLocationdata(branchlocation) {
  //   let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));


  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branchlocation, {
  //     headers: options,
  //   }).subscribe(resp => {
  //     console.log("location", resp);
  //     this.customerlocation = resp
  //     for (var i = 0; i < this.customerlocation.length; i++) {

  //       this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

  //     }
  //     console.log(this.locationcode1, 'fyttr')
  //   })
  // };


  // getPropertyCode(ev: any) {

  //   let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
  //   // console.log("one");
  //   this.propertyCode1 = [];
  //   if (ev.target.value == "") {
  //     this.propertyCode1 = [];
  //     this.isPropertycodeAvailable = false;
  //   }

  //   // Reset items back to all of the items
  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');

  //   this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindproperty/' + this.branch + "/" + strFunctionId + "/" + ev.target.value, {
  //     headers: options,
  //   }).subscribe(resp => {
  //     this.propertyCode1 = [];
  //     this.isPropertycodeAvailable = false;
  //     // set val to the value of the searchbar
  //     this.companiesstr = resp;
  //     console.log(this.companiesstr);


  //     this.isRecordShow = true;

  //     // this.companiesstr = JSON.parse(this.companiesstr);
  //     // this.companiesstr = JSON.parse(resp.toString());
  //     for (var i = 0; i < this.companiesstr.length; i++) {
  //       this.propertyCode1.push(this.companiesstr[i].ASSET_CODE);
  //     }
  //     const val = ev.target.value;

  //     // if the value is an empty string don't filter the items
  //     if (val && val.trim() != '') {
  //       this.isPropertycodeAvailable = true;
  //       this.propertyCode1 = this.propertyCode1.filter((item) => {
  //         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //       });
  //     }
  //     else {
  //       this.isPropertycodeAvailable = false;
  //     }
  //   }, error => {
  //     //this.presentAlert('Alert','Server Error,Contact not loaded');
  //     console.log("error : " + JSON.stringify(error));
  //   });

  // };

  getPropertyCode(ev: any) {

    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch: this.branchid ? this.branchid : 1,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      asset_code: this.assetCode ? this.assetCode : 0,
      strUserId: 0,
      UserType: parseInt(localStorage.getItem('TUM_USER_TYPE')),
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

    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.functionid + '/' + data.branch + '/' + data.Mode + '/' + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/'
      + data.asset_code + '/' + data.strUserId + '/' + data.UserType + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/'
      + data.drptype + '/' + data.TASKTYPE + '/' + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/' + data.wrkordno, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);
      this.propertyCode1 = [];
      this.getBranch = resp;
      this.isPropertycodeAvailable = false;
      console.log(this.getBranch);

      this.isRecordShow = true;

      for (var i = 0; i < this.getBranch.length; i++) {
        this.propertyCode1.push(this.getBranch[i].pmm_asset_code);
        console.log(this.propertyCode1.push(this.getBranch[i].pmm_asset_code));
      };

      const val = ev.target.value;

      if (val && val.trim() != '') {
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
      else {
        this.isPropertycodeAvailable = false;
      }
    });
  }

  addPropertycode(item: any) {

    this.assetCode = item;

    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.getBranch.length; i++) {
      if (this.assetCode == this.getBranch[i].pmm_asset_code) {
        this.pmm_asset_code = this.getBranch[i].id;
        console.log(this.pmm_asset_code);
      }
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");


    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch: this.branchid ? this.branchid : 1,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      asset_code: this.assetCode ? this.assetCode : 0,
      strUserId: 0,
      UserType: parseInt(localStorage.getItem('TUM_USER_TYPE')),
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      drpcategory: 0,
      drptype: 0,
      TASKTYPE: 0,
      PropCode: this.propertycode ? this.propertycode : 0,
      PropDesc: this.PrDesc ? this.PrDesc : 0,
      strCriticality: 0,
      assetName: this.assetname ? this.assetname : 0,
      actmaintenence: 0,
      wrkordno: 0,
    };

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getmytask/' + data.functionid + '/' + data.branch + '/' + data.Mode + '/' + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.dept + '/'
      + data.asset_code + '/' + data.strUserId + '/' + data.UserType + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.drpcategory + '/'
      + data.drptype + '/' + data.TASKTYPE + '/' + data.PropCode + '/' + data.PropDesc + '/' + data.strCriticality + '/' + data.assetName + '/' + data.actmaintenence + '/' + data.wrkordno, {
      headers: options,

    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respTaskDetails);

      this.propertyDesc = this.respTaskDetails[0]['pmm_asset_desc'];
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
  } respTaskDetails(respTaskDetails: any) {
    throw new Error('Method not implemented.');
  }
  ;


  taskDetails() {
    debugger
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branch: this.branchid ? this.branchid : 1,
      Mode: this.mode ? this.mode : 0,
      fromDate: this.fdate ? this.fdate : 0,
      toDate: this.tdate ? this.tdate : 0,
      Status: 0,
      dept: 0,
      asset_code: this.assetCode ? this.assetCode : 0,
      strUserId: 0,
      UserType: parseInt(localStorage.getItem('TUM_USER_TYPE')),
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
    if (this.branch == "undefined" || this.branch == null || this.branch == "") {
      this.presentAlert1("", "Please select Branch");
      return;
    } else {

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
        asset_code: this.assetCode ? this.assetCode :0 ,
        strUserId: 0,
        UserType: parseInt(localStorage.getItem('TUM_USER_TYPE')),
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
