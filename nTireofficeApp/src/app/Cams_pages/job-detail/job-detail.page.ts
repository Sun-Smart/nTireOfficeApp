import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import {TabparamserviceService} from '../../service/tabparamservice.service'
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {


  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  urldata;
  today:any;
  loginuser:any;
  carddata:any;
  responseData:any;
  pendingcomplete:any;
  AssetCodeComp:any;
  AssetDescriptionComp:any;
  WorkOrderComp:any;
  DateComp:any;
  work_num:any;
  activity:any;
  frequencyd:any;
  maintanance:any;
  assetid:any;
  activityid:any;
  pmrref:any;
  Planneddate:any;
  assetreference:any;
  TATEndsOnComp:any;
  assetpmtype:any;
  comment:any;
  comshow:any;
  comdte:any;
  relstatus;
  remarks;
  jobs;
  today1;
  endDate;
  taskCarried;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private Tabparams:TabparamserviceService) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');

    console.log(JSON.stringify(this.Tabparams.data));
    this.urldata = JSON.parse(JSON.stringify(this.Tabparams.data));
    //.log(item);
    this.today1 = new Date().toJSON().split('T')[0];
    // var today = new Date();
    // var todayDate = new Date();
    // var day = todayDate.getDate();
    // var month = todayDate.getMonth() + 1;
    // var year = todayDate.getFullYear();
    // var finaltodayDate = month + "/" + day + "/" + year;
    // this.today1 = finaltodayDate;

   }

  ngOnInit() {
    debugger;
    this.getJobDetails();
  }

  getCards(){

  }
  getJobDetails(){
debugger;
    var workOrderNum=this.urldata.WorkorderNo;
    console.log(workOrderNum);
    var today = new Date();
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "/" + day + "/" + year;
    this.today = finaltodayDate;
    console.log(this.today);

    this.loginuser = window.localStorage['TUM_USER_NAME'];
    console.log(workOrderNum)

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+'Pendingsearchs11?strfunction='+this.functionID+'&branch='+this.branchID+'&fdate=null&tdate=null&Status=null&strUserId='+this.userID+'&UserType='+this.usertype+'&drpcategory=null&drptype=null&TASKTYPE=MT&AssetCode=null', {
      // 'Pendingsearchs11?strfunction='+this.funtionID+'&branch='+this.branch_ID+'&fdate=null&tdate=null&Status=P&strUserId='+this.userID+'&UserType='+ this.usertype +'&drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null'
      headers: options,
    }).subscribe(resp => {
debugger;
      console.log(resp);
      
      this.carddata=resp;
      this.responseData = this.carddata;
      console.log(this.responseData)
      console.log(workOrderNum)
      var index = this.findWithAttr(this.responseData, 'WorkorderNo', workOrderNum);
      console.log(index)
        this.pendingcomplete = this.responseData;
        this.branch = this.pendingcomplete[index].Branch;
        console.log("branch",this.branch);

        this.AssetCodeComp = this.pendingcomplete[index].pmm_asset_code;
        this.AssetDescriptionComp = this.pendingcomplete[index].pmm_asset_desc;
        this.WorkOrderComp = this.pendingcomplete[index].WorkorderNo;
        this.DateComp = this.pendingcomplete[index].Creation_Date;
        this.work_num = this.pendingcomplete[index].WorkorderNo;
        this.activity = this.pendingcomplete[index].amd_activity_desc;
        this.frequencyd = this.pendingcomplete[index].amd_frequency;
        this.maintanance = this.pendingcomplete[index].amd_maintenance_duration;
        this.assetid = this.pendingcomplete[index].CMD_ASSET_ID;
        console.log(this.assetid);
        
        this.activityid = this.pendingcomplete[index].CMD_ACTIVITY_ID;
        console.log(this.activityid);
        
        this.pmrref = this.pendingcomplete[index].pmr_reference;
        console.log( this.pmrref);
        
        this.Planneddate = this.pendingcomplete[index].TAT_End;
        this.assetreference = this.pendingcomplete[index].pmr_asset_reference;
        this.TATEndsOnComp = this.pendingcomplete[index].pm_due_date;
        this.assetpmtype = this.pendingcomplete[index].ASSET_PM_TYPE;

        var datare = {
          'wkno':this.work_num,
          'assetid':parseInt(this.assetid),
          'branchid': this.branchID,
          'functionid':parseInt(window.localStorage['FUNCTION_ID']),
          'access_token':window.localStorage['token'],
          'userid':this.userID,
          'usertoken':this.userToken
        }
        console.log(datare);
        const header = new Headers();
        header.append("Content-Type", "application/json");

        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/reopencomments',datare, {
          headers: options,
        }).subscribe(resp => {
          debugger;
          console.log(resp)
          this.comment = resp;
          this.comshow=resp[0].ASSET_REASON;
          this.comdte=resp[0].ASSET_REOPEN_DATE;
          console.log(this.comment);
        }, error => {
          //this.presentAlert('Alert','Server Error,Contact not loaded');
          console.log("error : " + JSON.stringify(error));

        });

    }, error => {

      console.log(JSON.stringify(error));
    });
  }



findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

insert(endDate:any,releaseStatus:any){
console.log(endDate);
console.log(releaseStatus);

if(releaseStatus==true){
	this.relstatus='R';
}else{
	this.relstatus='N';
}

if(releaseStatus==true){
  var todayDate = new Date();
  var day = todayDate.getDate();
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getFullYear();
  var finaltodayDatep = day + "/" + month + "/" + year;

  var pduedte= this.datePipe.transform(endDate,"dd/MM/yyyy")

  // var day1 = pduedteo.getDate();
  // var month1 = pduedteo.getMonth() + 1;
  // var year1 = pduedteo.getFullYear();
  // var pduedte = day1 + "/" + month1 + "/" + year1;
  // var newtdate = year + "-" + month + "-" + day;
  console.log(pduedte);
  console.log(finaltodayDatep);
  var pduedte_array = pduedte.split('/');
  var new_pduedte = pduedte_array[1]+'/'+pduedte_array[0]+'/'+pduedte_array[2];
  var new_pduedte1 = new Date(new_pduedte).getTime();
  var finaltodayDatep_array = finaltodayDatep.split('/');
  var new_finaltodayDatep = finaltodayDatep_array[1]+'/'+finaltodayDatep_array[0]+'/'+finaltodayDatep_array[2];
  var new_finaltodayDatep1 = new Date(new_finaltodayDatep).getTime();
  console.log(new_finaltodayDatep1)
  // +this.remarks+'/1/2/100/'+this.pmrref+'/'+this.assetid+'/'+this.activityid+'/1/1/'+this.relstatus
  if(this.remarks ==''||this.remarks ==undefined){
    var newRemark =0;
    }else{
      newRemark=this.remarks
    }
    if(this.pmrref == ''||this.pmrref == undefined){
      var newpmrref = 0;
    }else{
      debugger;
      newpmrref = this.pmrref;
    }
    if(this.assetid == ''||this.assetid == undefined){
      var newassetid = 0 ;
    }else{
      newassetid  = this.assetid;
    }
    if(this.activityid  ==''||this.activityid == undefined){
     var newactivityid = 0
    }
    else{
      newactivityid = this.activityid
    }
    if(this.relstatus==''||this.relstatus==undefined){
      var newrelstatus=0;
    }else{
      newrelstatus=this.relstatus
    }
  if (new_finaltodayDatep1 == new_pduedte1 || new_finaltodayDatep1 > new_pduedte1) {
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "-" + day + "-" + year;

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+'CAMS_PENDING_COMPLETED/'+finaltodayDate+'/01/02/1/0/0/0/0/0/0/'+finaltodayDate+'/'+finaltodayDate+'/'+ newRemark +'/1/2/100/'+newpmrref+'/'+newassetid+'/'+newactivityid+'/1/1/'+newrelstatus , {
      // /CAMS_PENDING_COMPLETED/10-11-2022/01/02/1/0/0/0/0/0/0/10-11-2022/10-11-2022/undefined/1/2/100/594/133/485/1/1/R
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      if (resp != "") {
        this.jobs = "MT";
        //$scope.getCards();
        this.presentAlert("Success","Successfully Completed!")
        //  $state.go('app.complete');


      //  $scope.modal.hide();
      } else {}
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }else{
    this.presentAlert("Alert","Future Date Not Allowed")
  }
}else{
  alert("Future Date Not Allowed");
}

}


async presentAlert(heading, tittle) {
  var alert = await this.alertController.create({
    header: heading,
    backdropDismiss:false,
    message: tittle,
    buttons: ['OK']
  });

  await alert.present();
}

previous(){
  this.remarks = '';
  this.endDate = '';
  this.taskCarried = '';
}

go(){
  this.router.navigate(['/pending-jobs']);
}
}
