import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.page.html',
  styleUrls: ['./leave-request.page.scss'],
})
export class LeaveRequestPage implements OnInit {
  name;
  company;
  branch;
  empCode;
  status;
  department;
  empID;
  userID;
  contact;
  FUNCTION_ID;
  em_emp_id;
  leaveType;
  leavetypearray=[];
  leaveBal;
  preApprovalDays;
  dat_valid;
  noofDays;
  reqID;
  workflowTable;
  TUM_USER_ID;
  reqtype;
  usertoken;
  urldata;
  leavedata;
  LEAVEFRMDATE;
  LEAVETODATE;
  LEAVEBALANCE;
  LEAVEREASON;
  LEAVETYPE;
  leaveReq;
  RequestDate;
  Status;
  rreqid3: string;
  reqID2: string[];
  disabledvalue;
  release=false;
  refreqid: string;
  currentstatus;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router,private route:ActivatedRoute,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.disabledvalue = false;
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.company = window.localStorage['FUNCTION_DESC'];
   this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.em_emp_id=window.localStorage['em_emp_id'];
    this.TUM_USER_ID= window.localStorage['TUM_USER_ID'];
    console.log(this.TUM_USER_ID);
    this.usertoken = window.localStorage['usertoken'];
    this.leaveType="";
    this.dat_valid= {
      currentDate: new Date()
    };
    this.getEmployeeDetails();
    this.getLeaveType();
    this.urldata = this.route.params.subscribe(params => {

      this.leavedata=JSON.parse(params.item);
      if(this.leavedata!=undefined){
        this.LEAVEFRMDATE=this.leavedata.Leavefrmdate;
        this.LEAVEFRMDATE=this.leavedata.Leavefrmdate.split('/');
      this.LEAVEFRMDATE=this.LEAVEFRMDATE[2]+'-'+this.LEAVEFRMDATE[1]+'-'+this.LEAVEFRMDATE[0];
        this.LEAVETODATE=this.leavedata.Leavetodate;
        this.LEAVETODATE=this.leavedata.Leavetodate.split('/');
      this.LEAVETODATE=this.LEAVETODATE[2]+'-'+this.LEAVETODATE[1]+'-'+this.LEAVETODATE[0];
        this.LEAVEBALANCE=this.leavedata.Leavebalance;
        this.LEAVEREASON=this.leavedata.Leavereason;
        this.LEAVETYPE=this.leavedata.Leavetype;
        // this.LEAVEREQUESTREF=this.leavedata.LEAVEREQUESTREF;

        this.refreqid=this.leavedata.Txnreference;
        this.noofDays=this.leavedata.Nodays;
        this.RequestDate=this.leavedata.RequestDate;
        this.RequestDate=this.leavedata.RequestDate.split('/');
      this.RequestDate=this.RequestDate[2]+'-'+this.RequestDate[1]+'-'+this.RequestDate[0];
        this.Status=this.leavedata.Status;
        this.currentstatus = this.leavedata.Currentstatus;
        this.disabledvalue = true;
      }
   });
   }

  ngOnInit() {
  }
  leaveCancel(){
    this.leaveType="";
    this.leaveBal=undefined;
    this.fromDate=undefined;
    this.toDate=undefined;
    this.noofDays=undefined;
    this.reason=undefined;
  }
  getEmployeeDetails(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/GetEmployees/"+this.empCode).then(resp=>{
      console.log(resp);
      if (resp == "Employee not Exist") {
        this.toastmessageService.presentAlert1("","Employee Does not Exist");

      } else {
          this.status = "P";
          this.name = window.localStorage['TUM_USER_NAME'];

          this.company = window.localStorage['FUNCTION_DESC'];
          this.branch=window.localStorage['TUM_BRANCH_CODE']
       var employeeDetails = JSON.parse(resp.toString());

        this.department = employeeDetails[0].Department;
        this.empID = employeeDetails[0].EmpID;

        // this.userID = employeeDetails[0].UserID;
        this.contact = employeeDetails[0].ContactPhone;

      }
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  getLeaveType(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/LoadLeaveType/"+ this.FUNCTION_ID + "/" + this.em_emp_id).then(resp=>{
      this.leavetypearray = JSON.parse(resp.toString());
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getLeaveBalance(){
    console.log(this.leaveType);
    this.leaveBal="";
    this.preApprovalDays="";
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/EmployeeLeaveConfig/"+this.leaveType+ "/" +this.em_emp_id).then(resp=>{
      var reaparray = JSON.parse(resp.toString());

      this.leaveBal = reaparray[0].cur_balance;
      this.preApprovalDays = reaparray[0].PreApprovalDays
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  fromDate;
  toDate;
  validateFromDate(){
    var date1 = this.fromDate;
    var date2 = this.toDate;
    // date1.setHours(00, 00, 00);
    // date2.setHours(00, 00, 00);
    // console.log(date1, date2)
    if (date1 != undefined) {
      if (date1 < date2) {
        // console.log("To date should be greater than from date")
    alert("To date should be greater than from date");
    this.toDate = "";
      } else {
        var fromDate =new Date(this.fromDate);
        var toDate = new Date(this.toDate);


     // To calculate the time difference of two dates
     var Difference_In_Time = fromDate.getTime() - toDate.getTime();

     // To calculate the no. of days between two dates
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


     this.noofDays=-Difference_In_Days;
      }
    }
  }
 validateToDate(event){

    var date1 = this.fromDate;
    var date2 = this.toDate;
    if (date1 != undefined) {
      // console.log("To")
      if (date1 > date2) {
      alert("To date should be greater than from date");
      this.toDate = "";
      } else {

         var fromDate =new Date(this.fromDate);
         var toDate = new Date(event.target.value);


      // To calculate the time difference of two dates
      var Difference_In_Time = fromDate.getTime() - toDate.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


      this.noofDays=-Difference_In_Days+1;

      }
    }
  }

  reason;
  leaveSubmit(ltype){
    console.log(this.leaveType,ltype);
    if (this.contact == undefined) {
      this.contact = null;
    }

    if(this.release ==true)
    {
     this.status= 'P';
    }
    else{
     this.status= 'N';
    }
    var fromDate = this.formatDate(this.fromDate);
    var toDate = this.formatDate(this.toDate);
    var typeSelected = this.leaveType;
    var session = 0;
    var nod = this.noofDays;
    var reason = this.reason;
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/SaveLeave/"+ this.FUNCTION_ID + "/" + this.TUM_USER_ID + "/" + window.localStorage['empid'] + "/@/" + typeSelected + "/" + fromDate + "/" + toDate + "/" + nod + "/" + this.contact + "/" + reason + "/" + this.status).then(resp=>{
      if (resp == '"Attendance not available"') {
        // console.log("Gotcha : " + resp);
     this.toastmessageService.presentAlert1("Request Not Sent","Attendance is not available on the requested date")


      }
      else if (resp == '"Your request is on holiday, please choose different date"') {
        this.toastmessageService.presentAlert1("Request Not Sent"," Your request is on holiday, please choose different date")

      }
      else if (resp == '" Permission already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent"," Permission already available for this date")

      }
       else if (resp == '"Coff already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Coff already available for this date")

      }
      else if (resp == '"Leave Request already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Leave Request already available for this date")

      } else if (resp == '"Leave Request already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","COFF Request already available for this date")


      } else {
        //IF ATTENDANCE IS PRESENT


        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.rreqid3 = split[0];
        // console.log(""+this.reqID);
        this.reqID2 = this.rreqid3.split(',');
        this.reqID= this.reqID2[1];
        this.refreqid = this.reqID2[0];
        // console.log(""+ this.rreqid3+""+ this.reqID2)
        this.workflowTable = split[2];
        this.userID = this.TUM_USER_ID;;
        // console.log(split[2]);
        this.reqtype = 'null';

        // var replace = resp.toString().replace(/"/g, '');
        // var split = replace.split("@");
        // this.reqID = split[0];
        // this.workflowTable = split[2];
        // this.userID = this.TUM_USER_ID;
        // console.log(split[2]);


        if (split[1] == "Leave Saved Successfully") {
          this.toastmessageService.presentAlert1("Request Sent","Request Saved Successfully <br> Req Ref : " + this.refreqid)

         this.getLeaveType();
          this.reqtype = 'null';
          if (this.status == "P") {

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{
              if (resp == "1") {
                console.log("Workflow called successfully :" + resp);

              } else {
                // console.log("Workflow not called:" + resp);
              }
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });

          }
          var typerequest = 'LeaveRequest';
          var reportobj = {
            Userid: this.TUM_USER_ID,
            from: fromDate,
            to: toDate,
            typerequest: typerequest,
            userid:this.TUM_USER_ID,
            usertoken:this.usertoken,
            access_token: window.localStorage.token
          }
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getreportingto/",reportobj).then(resp=>{

          }, error => {

          console.log("error : "+JSON.stringify(error));

          });

         this.getLeaveType();

        }
      }
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
     this.leaveCancel();
  }
  formatDate(value){
    value = new Date(value);

    var day = value.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = value.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
      // console.log(month);
    }
    var year = value.getFullYear();
    value = day + "-" + month + "-" + year;
    return value;
  }


  leavesummary(){
    this.router.navigateByUrl('/hrmsleavesummary');
  }
}

