import { Component, OnInit } from '@angular/core';
// import { HttprequestService } from '../httprequest.service';
// import { IpaddressService } from '../ipaddress.service';
// import {ToastmessageService} from '../toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttprequestService } from 'src/app/service/httprequest.service';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { ToastmessageService } from 'src/app/service/toastmessage.service';
import { AlertController } from '@ionic/angular';
declare var $: any;
@Component({
  selector: 'app-myapprovals',
  templateUrl: './myapprovals.page.html',
  styleUrls: ['./myapprovals.page.scss'],
})
export class MyapprovalsPage implements OnInit {

  reqby;
  functionId;
  requests;
  reqType;
  requests1;
  show_request;
  show_color;
  approve_result1 = [];
  approval_search;
  requestBy;
  reqnumber;
  fromdate;
  todate;
  userid;
  userType;
  status : any;
  requestId;
  username;
  myapproval: any;
  constructor(private router: Router, private datepipe: DatePipe,
    private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService, private alertController: AlertController) {
    this.functionId = window.localStorage["FUNCTION_ID"];
    this.userid = window.localStorage['TUM_USER_ID'];
    this.userType = window.localStorage['TUM_USER_TYPE'];
    this.username = window.localStorage['TUM_USER_NAME']
    this.getReqtype();
  }

  ngOnInit() {
    this.reqType = "null";

    this.status = "";
  }

  getReqtype() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'RequestType?prefixText=null&sunctionid=' + this.functionId ).then(resp => {
      this.requests = resp;
      console.log(this.requests);

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  onSelectChange(event:any){
    console.log(event.target.value);
    this.requestId = event.target.value;

  }
  validrequestNumber(reqType) {
    if (this.reqType == null || this.reqType == '') {
      alert("Please Choose Reqest Type");
    } else {
      this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms3 + 'RequestType?prefixText=&functionid=' + this.functionId + '').then(resp => {
        this.requests1 = JSON.parse(resp.toString());
        console.log(this.requests1); {
          if (this.requests1 == 1) {
            this.show_request = "valid";
            this.show_color = "balanced";
          } else {
            this.show_request = "Invalid";
            this.show_color = "assertive";
          }
        }

      }, error => {

        console.log("error : " + JSON.stringify(error));

      });

    }
  }
  myApprovalSearch() {

    if (this.reqType == "Employee not Exist") {
      this.toastmessageService.presentAlert1("", "Please select Req. Type");
    }

    else if (this.fromdate > this.todate) {
      this.toastmessageService.presentAlert1("","To date should be greater than From date");
    }
else{
    this.approve_result1 = [];
    this.fromdate = this.datepipe.transform(this.fromdate, "dd/MM/yyyy")||null;
    var todate = this.datepipe.transform(this.todate, "dd/MM/yyyy")||null;
    var status=this.status||null;

    // this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getMailBoxHistory?strFunction=' + window.localStorage["FUNCTION_ID"] + '&strConfigId=' + this.reqType + '&Username=' + this.requestBy + '&strWorkFlowNo=' + this.reqnumber + '&strFromDate=' + fromdate + '&strToDate=' + todate + '&strWFstatus=' + this.status + '&strMode=&strUserId=' + this.userid + '&strusertype=' + this.userType).then(resp => {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'myapprovalsearch?strFunction=' + this.functionId+ '&strConfigId=' + this.requestId + '&Username=' + this.username + '&strWorkFlowNo=null'+ '&strFromDate='+this.fromdate+ '&strToDate='+todate+'&strWFstatus=' + status + '&strMode=null&strUserId=' + this.userid + '&strusertype=' + this.userType).then(resp => {
    this.myapproval=resp
      var dat_s1 = JSON.stringify(resp);
      var dat_s=JSON.parse(dat_s1)
      console.log(dat_s.Table);

      if (dat_s.length > 0) {
        this.approve_result1 = dat_s;
        // this.approve_result=this.approve_result[0].RequestDate;
        console.log(this.approve_result1,"tab");

      } else {
        console.log('No record found');
        this.approve_result1 = [];
        this.approval_search = "No record found"
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });

  }
  }

  showless(idvalue) {
    $("#dividvals" + idvalue).css("display", "none");
    $("#imageidvals" + idvalue).show();

  };
  showmore(idvalue, id) {
    $("#dividvals" + idvalue).css("display", "block");
    $("#imageidvals" + idvalue).hide();
  };

  pathRedirect(item) {
    this.router.navigate(['/coff-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect1(item) {
    this.router.navigate(['/assetrequest', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect2(item) {
    this.router.navigate(['/leave-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect3(item) {
    this.router.navigate(['/permission-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect4(item) {
    this.router.navigate(['/assetreturn', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect5(item) {
    this.router.navigate(['/od-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect6(item) {
    this.router.navigate(['/loan-request', {
      item: JSON.stringify(item)

    }])
  }
}

