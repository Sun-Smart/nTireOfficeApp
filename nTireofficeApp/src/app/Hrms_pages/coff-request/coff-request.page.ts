import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-coff-request',
  templateUrl: './coff-request.page.html',
  styleUrls: ['./coff-request.page.scss'],
})
export class CoffRequestPage implements OnInit {

  empCode;
  status;
  name;
  company;
  date;
  CODate;
  OTDate;
  department;
  empID;
  userID;
  contact;
  branch;
  availed_on;
  workingdate;
  leavetype;
  reason;
  reqref;
  RequestRefshow:boolean;

  workflowTable;
  reqtype;
  usertoken;
  coffdate;
  urldata;
  coffdata;
  RequestDate;
  dat_valid;
  disabledvalue;
  release=false;
  reqID1: string;
  reqID: string;
  today = new Date();
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router,private route:ActivatedRoute,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    this.disabledvalue = false;
    console.log(this.reqref);
    this.urldata = this.route.params.subscribe(params => {
      console.log(params);
      this.coffdata=JSON.parse(params.item);
      console.log(""+JSON.stringify(this.coffdata));

      if(this.coffdata!=undefined){
        this.reqID1=this.coffdata.Txnreference;
        console.log(""+JSON.stringify(this.reqref));
        this.RequestDate=this.coffdata.Requesteddate;
        this.RequestDate=this.coffdata.Requesteddate.split('/');
        this.RequestDate=this.RequestDate[2]+'-'+this.RequestDate[1]+'-'+this.RequestDate[0];
        console.log(this.RequestDate);
        // this.COFFREQUESTREF=this.coffdata.COFFREQUESTREF;
        this.coffdate = this.coffdata.Coffdate;
        this.coffdate=this.coffdata.Coffdate.split('/');
        this.coffdate=this.coffdate[2]+'-'+this.coffdate[1]+'-'+this.coffdate[0];
        this.reason = this.coffdata.Reason;

        this.workingdate =  this.coffdata.Coffworkdate;
        this.workingdate =  this.coffdata.Coffworkdate.split('/');
        this.workingdate=this.workingdate[2]+'-'+this.workingdate[1]+'-'+this.workingdate[0];
        this.status=this.coffdata.Status;
        this.disabledvalue = true;
        if(this.coffdata.Currentstatus == "P"){
          this.release = true;
        }
        if(this.coffdata.Currentstatus == "N"){
          this.release = false;
        }

        this.leavetype = this.coffdata.Cofftype;
        // this.workflow_no=this.coffdata.workflow_no;
      }
   });

    this.leavetype="";
    if(this.reqref!=undefined){

      this.RequestRefshow=true;


    }
    else{

      this.RequestRefshow=false;

    }
    this.dat_valid= {
      currentDate: new Date()
    };
    this.getEmployeeDetails();


   }
  clearToDate() {
  this.workingdate = undefined;
  }
  workingchange(data){

    var date1 = this.coffdate;
    var date2 = data;

    if (data == undefined) {
  this.toastmessageService.presentAlert1("","Lieu working on date should not be empty");

    } else if (date1 < date2) {
      this.toastmessageService.presentAlert1("","Lieu working on date should be lesser than C-off Availed on date");

      this.workingdate = "";
    } else if (date1 == date2) {
      this.toastmessageService.presentAlert1("","Lieu working on date should not be same as C-off Availed on date");

      this.workingdate = "";
    } else {
      // console.log("No Validation Error")
    }
  }
  ngOnInit() {
  }
  getEmployeeDetails(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/GetEmployees/"+this.empCode).then(resp=>{
      if (resp == "Employee not Exist") {
  this.toastmessageService.presentAlert1("","Employee Does not Exist");

      } else {


        this.status = "P";
        this.name = window.localStorage['TUM_USER_NAME'];
        // console.log(this.coff.name);
        // this.validate = validate;
        this.company = window.localStorage['FUNCTION_DESC'];
        this.branch=window.localStorage['TUM_BRANCH_CODE']
        // this.date = dateService.getTodayDate();
        // this.CODate = dateService.formatDate2(this.availed_on);
        // this.OTDate = dateService.formatDate2(this.working_on);

        var employeeDetails = JSON.parse(resp.toString());

        this.department = employeeDetails[0].Department;
        this.empID = employeeDetails[0].EmpID;

        this.userID = employeeDetails[0].UserID;
        this.contact = employeeDetails[0].ContactPhone;

      }
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  coffSubmit(){
    if (this.contact == undefined) {
      this.contact = null;
    }
    var date1 = this.formatDate2(this.coffdate);
    var date2 = this.formatDate2(this.workingdate);

    var fromdate =this.datepipe.transform(this.coffdate, "yyyy-MM-dd");
    var todate =this.datepipe.transform(this.workingdate, "yyyy-MM-dd");
    var reqdate = this.datepipe.transform(Date.now(), "dd-MM-yyyy")
    if(this.release ==true)
    {
     this.status= 'P';
    }
    else{
     this.status= 'N';
    }

    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "SaveCOFF/" + window.localStorage['FUNCTION_ID'] + "/" + this.userID + "/" + this.empID + "/@/" + date1 + "/" + date2 + "/" + this.contact + "/" + this.leavetype + "/" + this.reason + "/"+ reqdate + "/" + this.status).then(resp=>{
      console.log(""+resp);

      if (resp=="C-OFF should not Availed On  Week Days") {

        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent","COFF not avail for week days");


      }


      else if (resp == "Permission already available for this date") {
        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent","  Permission already available for this date");
       }

       else if (resp == "OD already available for this date") {
        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent","OD already available for this date");
       }

      else if (resp == "Attendance not available") {
        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent","Attendance is not available on the requested date");
       }
      else if (resp == "Leave already available for this date") {
        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent","Leave already available for this date");
       }
       else if (resp == "C-OFF  Request already available for this date ") {
        // console.log("Gotcha : " + response);
        this.toastmessageService.presentAlert1("Request Not Sent"," C-OFF  Request already available for this date");
       }else if (resp == "Employee Office Hrs should not be less that Total Office Hrs") {
        this.toastmessageService.presentAlert1("Request Not Sent","Employee office hrs should not be less than total office hrs");

      } else if (resp == "C-OFF  Request already available for this date") {
        this.toastmessageService.presentAlert1("Request Not Sent","C-OFF  Request already available for this date");

      }
      else if (resp == '"Permission already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Permission already available for this date");

          }else {
        //IF ATTENDANCE IS PRESENT
        console.log(resp);
        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        //this.reqID = split[0];
       var req = split[0];
       this.reqID = split[0];
         this.workflowTable = split[2];
         this.userID = this.userID;

        this.reqID1 = req.split(',')[0]
        this.reqID= req.split(',')[1];
        // console.log(this.workflowTable);

        var replace =resp.toString().replace(/"/g, "");


        // var split = replace.split("@");
        // this.reqref = split[0];
        // this.workflowTable = split[2];
        // this.userID = this.userID;
        // // console.log(split[2]);

        if (split[1]=="C-off Saved Successfully") {
          this.toastmessageService.presentAlert1("Request Sent","Request saved Successfully <br> Req Ref : "+ this.reqID1);

          // this.reqref = this.reqref.split(',');
          // this.reqref = this.reqref[1];

          this.reqtype = 'null';

          if (this.status == "P") {
            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/" +  this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{

            }, error => {

            console.log("error : "+JSON.stringify(error));

            });

          }

          var typerequest = "Coff Request";
          var perdate = null;
          var reportobj = {
            Userid: '',
            from: '',
            to: '',
            typerequest: '',
            userid: '',
            usertoken: '',
            access_token: ''
          }
          reportobj.Userid=this.userID
          reportobj.from=fromdate
          reportobj.to=todate
          reportobj.typerequest=typerequest
          reportobj.userid=this.userID
          reportobj.usertoken=this.usertoken
          reportobj.access_token=window.localStorage.token
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms2+"getreportingto/",reportobj).then(resp=>{

          }, error => {

          console.log("error : "+JSON.stringify(error));

          });
         this.refresh();
        }
      }
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  refresh(){
    this.coffdate = '';
    this.workingdate='';
    this.leavetype='';
    this.reason='';
  }
  formatDate2(value) {
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
  coffCancel(){
    this.coffdate=undefined;
    this.workingdate=undefined;
    this.leavetype="";
    this.reason=undefined;
  }
  coffList(){
    this.router.navigateByUrl('/hrmscoffsummary');
  }
}
