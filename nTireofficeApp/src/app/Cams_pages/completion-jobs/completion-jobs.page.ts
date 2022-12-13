import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
// import {CompletionJobsModelPage} from '../completion-jobs-model/completion-jobs-model.page'
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-completion-jobs',
  templateUrl: './completion-jobs.page.html',
  styleUrls: ['./completion-jobs.page.scss'],
})
export class CompletionJobsPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  fromdate;
  todate;
  Realease_status:any;
  assetcode1;
  isItemAvailable:boolean;
  assetcode1str:any;
  assetcodeResult:any;
  assetCode:any;
  carddata:any;
  product:any;
  subCategoryresp:any;
  responseData1=[];
  jobs:any;
  responseDatalength:any;
  branch1:any;
  refmaxnum:any;
  category:any;
  subCategory:any;
  username:any;
  remove_array:any=[];
  responseData2=[];
  fromdate2;
  todate2;
  constructor(public modalController:ModalController,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router: Router) {


    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    console.log(this.branchID);

    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');

    this.fromdate = this.datePipe.transform(this.fromdate, 'dd/MM/yyyy');
    this.todate = this.datePipe.transform(this.todate, 'dd/MM/yyyy');
    // this.Realease_status = "<<Select>>";
    this.category = "<< Select >>";
    this.subCategory = "<< Select >>";
    this.jobs = "<< Select >>";
    this.getAssertCatergory();
    this.getReferMax();

   }

  ngOnInit() {

    this.completioncards();
  }

  doRefresh(event){
    this.getAssertCatergory();
    this.completioncards();
    this.fromdate='';
    this.todate='';
    this.Realease_status = "<< Select >>";
    this.category="<< Select >>";
    this.subCategory="<< Select >>";
    this.jobs="<< Select >>";
    event.target.complete();
  }

  getAssertCatergory(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    var assetCatParms = {
      functionidrep: localStorage.getItem('FUNCTION_ID'),
      access_token: localStorage.getItem('token'),
      userid: localStorage.getItem('TUM_USER_ID'),
      'usertoken': localStorage.getItem('usertoken'),
      USER_ID: localStorage.getItem('TUM_USER_ID'),
    };
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationcategory',assetCatParms, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      //var fulldata = resp.data;
      this.product = resp;
      console.log(this.product);

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  getsubCategory(event){
    console.log(event)
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    var assetCatParms = {
      functionidrep: localStorage.getItem('FUNCTION_ID'),
      access_token: localStorage.getItem('token'),
      userid: localStorage.getItem('TUM_USER_ID'),
      'usertoken': localStorage.getItem('usertoken'),
      USER_ID: localStorage.getItem('TUM_USER_ID'),
      categoryid:parseInt(event)
    };
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationsubcategory',assetCatParms, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      //var fulldata = resp.data;
      this.subCategoryresp = resp;
      console.log(this.subCategoryresp);

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  completioncards(){
    console.log(event)

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+'CAMSPENDING_COMPLTED_SEARCH?strfunction='+this.functionID+'&branch='+this.branchID+'&fdate=null&tdate=null&Status=C&drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null', {
                                                                                                             // /CAMSPENDING_COMPLTED_SEARCH?strfunction=1&branch=1&fdate=null&tdate=null&Status=P
                                                                                                      // &drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.carddata=resp;
      this.responseData1 = this.carddata;
      console.log(this.responseData1.length);
    this.responseDatalength = this.responseData1.length;
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

//   requestedJobs() {
//     console.log(this.jobs)
//     this.responseData1 = [];
//     const header = new Headers();
//     header.append("Content-Type", "application/json");

//     let options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+'CAMSPENDING_COMPLTED_SEARCH?strfunction='+this.functionID+'&branch='+this.branchID+'fdate=null&tdate=null&Status=C&drpcategory=null&drptype=null&TASKTYPE='+this.jobs+'&AssetCode=null', {
//                                                                                                          // /CAMSPENDING_COMPLTED_SEARCH?strfunction=1&branch=1&fdate=null&tdate=null&Status=P
//                                                                                                       // &drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null

//       headers: options,
//     }).subscribe(resp => {
//       this.carddata=resp;
//       this.responseData1 = JSON.parse(this.carddata);
//       console.log(this.responseData1);
//       this.responseDatalength = this.responseData1.length;
//       this.branch1 = this.responseData1[0].Branch;

//     }, error => {

//       console.log(JSON.stringify(error));
//     });
// }

showmore(idvalue) {
  //        alert(idvalue);
  $("#dividvalsp" + idvalue).css("display", "block");
  $("#imageidvalsp" + idvalue).hide();
}
showless(idvalue) {
  //        alert(idvalue);
  $("#dividvalsp" + idvalue).css("display", "none");
  $("#imageidvalsp" + idvalue).show();
};

getReferMax(){
  var check = "a";
  var datar = {
    'assetcoder': check,
    'access_token':localStorage.getItem('token'),
    'userid':this.userID,
    'usertoken':localStorage.getItem('usertoken'),
  }
  console.log(datar);

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/refrencemax/',datar, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)
    this.refmaxnum = resp[0].refnum;
    console.log(this.refmaxnum);
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
}
// requestedJobs(){}

closecompletejob(item){

if(item.CMD_ACTIVITY_ID == null || item.CMD_ASSET_ID == null){

  this.presentAlert('Alert','cant Close');
}else{

  var functionreport1 = this.functionID;
  var brnchlreport1 = this.branchID;
  var userid = this.userID;
  var todayDate = new Date();
  var day = todayDate.getDate();
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getFullYear();
  var hh = todayDate.getHours();
  var mm = todayDate.getMinutes();
  var ss = todayDate.getSeconds();
  //var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss + "." + "000";
  var finaltodayDate = year + "-" + month + "-" + day;

  var datazcc = {
    'functionidrep': functionreport1,
    'branchid': brnchlreport1,
    'activityid': item.CMD_ACTIVITY_ID,
    'assetid': parseInt(item.CMD_ASSET_ID),
    'createdby': userid,
    'frequency': item.amd_frequency,
    'actualhours': item.amd_maintenance_duration,
    'todaydte': finaltodayDate,
    'refmaxno': this.refmaxnum,
    'typeid': item.TUM_USER_TYPE,
    'pmrefre': item.pmr_asset_reference,
    'camuserid': item.TUM_USER_ID,
     'access_token':this.accessToken,
     'userid':this.userID,
      'usertoken':this.userToken
  }
  console.log(datazcc);

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/compltedjonclose',datazcc, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)
    this.presentAlert('Response','Successfully Closed');
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
}

}


async presentAlert(heading, tittle) {
  var alert = await this.alertController.create({
    header: heading,
    cssClass:'buttonCss',
    backdropDismiss:false,
    message: tittle,
    buttons: ['OK']
  });

  await alert.present();
}

async reopenActionModal(obj){
  console.log(obj);
  this.router.navigate(['/completion-jobs-reopen',obj]);
  }
// nandhini//
requestedJobs() {
  debugger;
  console.log(this.jobs)
  // this.responseData = {};

  // if (this.Realease_status == "<< Select >>" || this.Realease_status == undefined) {
  //   var status = "null";
  // } else {
  //   status = this.Realease_status
  // }

  if (this.jobs == "<<Select>>" || this.jobs == undefined) {
    var jobs = 'MT';
  } else {
    jobs = this.jobs
  }

  if (this.category == "<<Select>>" || this.category == undefined) {
    var assetCat = 'null';
  } else {
    assetCat = this.category
    console.log(assetCat)
  }

  if (this.subCategory == "<< Select >>" || this.subCategory == undefined) {
    var assetSubCat = 'null';
  } else {
    assetSubCat = this.subCategory
  }

  if (this.fromdate == "<<Select>>" || this.fromdate == undefined) {
    var fromdate = 'null';
  } else {
    this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd/MM/yyyy');
    fromdate = this.fromdate2
  }

  if (this.todate == "<<Select>>" || this.todate == undefined) {
    var todate = 'null';
  } else {
    this.todate2 = this.datePipe.transform(this.todate, 'dd/MM/yyyy');
    todate = this.todate2
  }
  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlCams + 'CAMSPENDING_COMPLTED_SEARCH?strfunction='+this.functionID+'&branch='+window.localStorage.getItem('id')+'&fdate='+fromdate+'&tdate='+todate+'&Status=C&drpcategory='+assetCat+'&drptype='+assetSubCat+'&TASKTYPE='+jobs+'&AssetCode=null', {
    // &TASKTYPE=84&AssetCode=MT
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
    if (resp == null || resp == "No data found" || resp == "[]") {
      this.responseData1 = [];
    } else {
      this.carddata = resp;
      this.responseData1 = this.carddata;
      console.log(this.responseData1);
      this.responseDatalength = this.responseData1.length;
      this.branch1 =this.responseData1[0].Branch;
    }

  }, error => {

    console.log(JSON.stringify(error));
  });
}

  // nandhini//
  // compdateval(){
  //   debugger
  //   this.responseData1=[];
  //   var from = this.fromdate;
  //   var from_timestamp = new Date(from).getTime();
  //   console.log(from_timestamp);
  //   var to = this.todate;
  //   var to_timestamp = new Date(to).getTime();

  //   console.log(from_timestamp);
  //   console.log(to_timestamp);

  //   if (from != null) {

  //     if (from_timestamp <= to_timestamp) {
  //       const header = new Headers();
  //       header.append("Content-Type", "application/json");

  //       let options = new HttpHeaders().set('Content-Type', 'application/json');
  //       this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+'CAMSPENDING_COMPLTED_SEARCH/?strfunction='+this.functionID+'&branch='+this.branchID+'&fdate='+this.fromdate+'&tdate='+this.todate+'&Status=C&drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null',{
  //                                                                                                            // /CAMSPENDING_COMPLTED_SEARCH?strfunction=1&branch=1&fdate=null&tdate=null&Status=P
  //                                                                                                     // &drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null
  //         headers: options,
  //       }).subscribe(resp => {
  //         this.carddata=resp;
  //         console.log(this.carddata);
  //         debugger;

  //         this.responseData2 = this.carddata;
  //         debugger;
  //         console.log(this.responseData2);
  //         debugger;
  //        for (var i = 0; i < this.responseData2.length; i++) {
  //         //console.log(this.responseData1);
  //           var newtemp = this.responseData2[i].pm_due_date.split("/");
  //         //  console.log(newtemp)
  //           var newDate = newtemp[1] + "/" + newtemp[0] + "/" + newtemp[2];
  //           var pmDate_timestamp = new Date(newDate).getTime();
  //         //  console.log(pmDate_timestamp)
  //           if (from_timestamp < pmDate_timestamp && to_timestamp > pmDate_timestamp) {
  //           //  console.log("test")
  //           } else {
  //             console.log(i);
  //            this.remove_array.push(i);
  //            console.log(this.remove_array);

  //           }
  //         }
  //         //this.remove_array.sort((a, b) => {return b - a });
  //         // this.remove_array.sort(function(a, b) { return b - a });
  //         // for (var j = 0; j < this.remove_array.length; j++) {
  //         //   console.log(this.remove_array[j]);


  //         //   this.responseData1=this.responseData2.splice(this.remove_array[j], 1);
  //         //   console.log(this.remove_array[j]);
  //         //   this.responseDatalength = this.responseData1.length;
  //         //   console.log(this.responseData1)
  //         // }
  //         this.responseData1=this.responseData2.splice(this.remove_array[i]);
  //         console.log(this.responseData1);

  //       }, error => {

  //         console.log(JSON.stringify(error));
  //       });
  //        console.log(this.responseData1)
  //     }else{
  //     this.presentAlert('Invalid date','From date should be lesser than To date!');
  //     }

  //   }else{
  //     this.presentAlert('Invalid date','From Date should not be empty!');
  //   }
  // }
}

