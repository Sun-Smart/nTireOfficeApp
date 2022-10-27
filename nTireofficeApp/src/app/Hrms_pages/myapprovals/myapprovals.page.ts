import { Component, OnInit } from '@angular/core';
// import { HttprequestService } from '../httprequest.service';
// import { IpaddressService } from '../ipaddress.service';
// import {ToastmessageService} from '../toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttprequestService } from 'src/app/service/httprequest.service';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { ToastmessageService } from 'src/app/service/toastmessage.service';
declare var $: any;
@Component({
  selector: 'app-myapprovals',
  templateUrl: './myapprovals.page.html',
  styleUrls: ['./myapprovals.page.scss'],
})
export class MyapprovalsPage implements OnInit {

  reqby;
  functionId;
  requests = [];
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
  status;
  constructor(private router: Router, private datepipe: DatePipe,
    private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.functionId = window.localStorage["FUNCTION_ID"];
    this.userid = window.localStorage['TUM_USER_ID'];
    this.userType = window.localStorage['TUM_USER_TYPE'];
    this.getReqtype();
  }

  ngOnInit() {
  }

  getReqtype() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms3 + 'RequestType?prefixText=&functionid=' + this.functionId + '').then(resp => {
      this.requests = JSON.parse(resp.toString());
      console.log(this.requests);

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
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

    this.approve_result1 = [];
    var fromdate = this.datepipe.transform(this.fromdate, "dd/MM/yyyy");
    var todate = this.datepipe.transform(this.todate, "dd/MM/yyyy");


    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms3 + 'getMailBoxHistory?strFunction=' + window.localStorage["FUNCTION_ID"] + '&strConfigId=' + this.reqType + '&Username=' + this.requestBy + '&strWorkFlowNo=' + this.reqnumber + '&strFromDate=' + fromdate + '&strToDate=' + todate + '&strWFstatus=' + this.status + '&strMode=&strUserId=' + this.userid + '&strusertype=' + this.userType).then(resp => {
      var dat_s = JSON.parse(resp.toString());

      if (dat_s.Table.length > 0) {
        this.approve_result1 = dat_s.Table;
        // this.approve_result=this.approve_result[0].RequestDate;
        console.log(this.approve_result1);

      } else {
        console.log('No record found');

        this.approve_result1 = [];
        this.approval_search = "No record found"
      }

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });


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
    this.router.navigate(['/hrmscoff-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect1(item) {
    this.router.navigate(['/hrmsassetrequest', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect2(item) {
    this.router.navigate(['/hrmsleave-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect3(item) {
    this.router.navigate(['/hrmspermission-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect4(item) {
    this.router.navigate(['/hrmsassetreturn', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect5(item) {
    this.router.navigate(['/hrmsod-request', {
      item: JSON.stringify(item)

    }])
  }
  pathRedirect6(item) {
    this.router.navigate(['/hrmsloan-request', {
      item: JSON.stringify(item)

    }])
  }
}

