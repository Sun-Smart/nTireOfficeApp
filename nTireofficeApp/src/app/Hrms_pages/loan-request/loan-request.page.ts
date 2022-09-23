import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.page.html',
  styleUrls: ['./loan-request.page.scss'],
})
export class LoanRequestPage implements OnInit {
  empcode;
  userid;
  usertoken;
  token;
  empCode;
  designationemp;
  // designationemp_res;
  empname;
  department;
  designation;
  designationid;
  schemes=[];
  schemes1;
  gradeslist;
  grade;
  loandetails;
  intrate;
  loanname;
  maxligiblity;
  maxinstallment;
  loancode;
  empID;
  amountdetails;
  loanamount;
  cureligiblity;
  advamount;
  installments;
  mondeduct;
  perdate;
  loanreqno;
  reqID;
  userID;
  workflowTable;
  urldata;
  loandata;
  name;
  company;
  contact;
  branch;
  reqtype;
  Scheme;
  emiamount;
  status;
  loanScheme;
  release: any;
  disabledvalue;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router,private route:ActivatedRoute,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.userid = window.localStorage['TUM_USER_ID'];
    this.usertoken = window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.empID=window.localStorage['empID'];

    this.empCode= window.localStorage['TUM_USER_CODE'];
    this.release=false;
    this.reqtype="";
    this.getDesignation();
    this.getEmployeeDetails();

    this.urldata = this.route.params.subscribe(params => {
      this.loandata=JSON.parse(params.item);
      if(this.loandata!=undefined){
      this.loanreqno= this.loandata.RequestRef;
        // RequestDate
        // Status
      }
   });
    // this.getEmployeeDetails();
  this.loanScheme="";
  }
  getEmployeeDetails(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"GetEmployees/"+this.empCode).then(resp=>{
      console.log(resp);
      if (resp == "Employee not Exist") {
  this.toastmessageService.presentAlert1("","Employee Does not Exist");

      } else {
          this.status = "P";
          this.name = window.localStorage['TUM_USER_NAME'];

          this.company = window.localStorage['FUNCTION_DESC'];
          this.branch=window.localStorage['TUM_BRANCH_CODE']
       var employeeDetails = JSON.parse(resp.toString());
        console.log(employeeDetails);
       this.designation = this.designationemp.recordset[0].DESCRIPTION;
        this.department = employeeDetails[0].Department;
        this.empID = employeeDetails[0].EmpID;
    console.log(""+ this.designation);
        // this.userID = employeeDetails[0].UserID;
        this.contact = employeeDetails[0].ContactPhone;

      }
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  ngOnInit() {
  }
  getDesignation(){

    var obj1={
      emp_code:this.empCode,
      userid:this.userid,
     usertoken:this.usertoken,
     access_token:this.token
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getdesignation/",obj1).then(resp=>{
      this.designationemp = resp;
      console.log(this.designationemp );
      this.empname = this.designationemp[0].em_emp_name;
      this.department = this.designationemp[0].TEXT;
      this.designation = this.designationemp[0].DESCRIPTION;
      console.log( this.designation)
      // console.log( this.department)
      this.designationid = this.designationemp[0].TYPE_ID;
      window.localStorage['desig_id'] = this.designationid;


      console.log(this.designationemp);
      this.loanscheme(this.designationid)
    }, error => {

    console.log("error : "+JSON.stringify(error));

    });
  }
  cancelLoan(){
    this.reqtype="";
    this.loanScheme="";
    this.loanname="";
    this.maxinstallment="";
    this.loancode="";
    this.maxligiblity="";
    this.intrate="";
    this.loanamount="";
    this.cureligiblity="";
    this.emiamount="";
    this.advamount="";
    this.installments="";
    this.mondeduct="";
  }
  loanscheme(val){

    var DESIGNATION = val;
    console.log(DESIGNATION)
    var loanobj={
     DESIGNATION:DESIGNATION,
     userid:this.userid,
     usertoken:this.usertoken,
     access_token:this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getloanscheme/",loanobj).then(resp=>{
      this.schemes1 = resp;
      console.log(this.schemes1);
      this.schemes1.forEach(element => {
        this.schemes.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  changescheme(val){
    var schemeid = val;
    console.log(schemeid)
    var desigid = window.localStorage['desig_id'];
     var getobj1={
      scheme_id:schemeid,
      desigid:desigid,
      userid:this.userid,
      usertoken:this.usertoken,
      access_token:this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getgrade/",getobj1).then(resp=>{
      this.gradeslist = resp;
      this.grade = this.gradeslist[0].grade;
      // console.log(this.grade)
      console.log(this.gradeslist);
      this.loanDetailsFunction(this.grade, schemeid);
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  loanDetailsFunction(grade,schemeid){
     var func_id = 1;
 var getloan={
    scheme_id:schemeid,
    grade:grade,
    func_id:func_id,
    userid:this.userid,
    usertoken:this.usertoken,
    access_token:this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getloandetails/",getloan).then(resp=>{
      this.loandetails = resp;
      console.log(this.loandetails);
      this.intrate = this.loandetails[0].int_rate;
      this.loanname = this.loandetails[0].scheme_desc;
      this.maxligiblity = this.loandetails[0].max_eligibility;
      this.maxinstallment = this.loandetails[0].max_installment;
      this.loancode = this.loandetails[0].scheme_code;

     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
     var getamt={
      schemeid:schemeid,
      empID:this.empID,
      userid:this.userid,
      usertoken:this.usertoken,
      access_token:this.token
      }
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getamountdetails/",getamt).then(resp=>{
       this.amountdetails = resp;
       this.loanamount =this.amountdetails[0].totalamount;
        // console.log(this.amountdetails);
       this.cureligiblity =this.maxligiblity -this.loanamount;
        window.localStorage['cureligiblity']=this.cureligiblity;

       }, error => {

       console.log("error : "+JSON.stringify(error));

       });
  }
  getadvanceemi(){
    var advamount =this.advamount;
    var advinstalmnts = this.installments;
    var AdvEMI = advamount / advinstalmnts;
    this.mondeduct = AdvEMI;
  }

  loanSubmit(){
    if (this.reqtype == 2) {
      var amount = this.advamount;
      var moninstall = this.installments;
      var schemeid = 0;
      var emiamount = this.mondeduct;
      var eligibilityamount = this.maxligiblity;

    } else {
       schemeid = this.loanScheme;
      var amount = this.loanamount;
      var moninstall = this.maxinstallment;
      var emiamount = this.emiamount;
      var eligibilityamount = this.maxligiblity;
    }
    this.status='P';
    var functionid = 1;

    if(this.release ==true)
    {
     this.status= 'P';
    }
    else{
     this.status= 'N';
    }


    var OBJ = {
      emp_id: window.localStorage['em_emp_id'],
      req_type: this.reqtype,
      scheme_id: schemeid,
      MonthLy_installment: moninstall,
      Amount: amount,
      Status:  this.status,
      Monthly_deduct: emiamount,
      Rev_loan:'',
      CreatedBy: this.userid,
      user_id: this.userid,
      Createdon: new Date(),
      Updatedon: new Date(),
      ipaddress: '192.168.0.47',
      isdeferral: 'P',
      deferralmode: 0,
      function_id: functionid,
      access_token:window.localStorage['token'],
      userid:this.userid,
      usertoken:this.usertoken

    }
    console.log(OBJ)
    if (this.loanamount > this.maxligiblity) {

  this.toastmessageService.presentAlert1("","Loan Amount Is Greater Than Current Eligibility");

    }

    if (this.loanamount <= this.maxligiblity) {

      var emiinterest =this.loanamount + (this.loanamount * this.intrate / 100);
      var EMI = emiinterest / this.maxinstallment;
      this.emiamount = EMI;

    }
if(this.reqtype == 1){
this.perdate = "Loan";
}
else{
this.perdate="Advance";
}
this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"insertloanadvancedetails/",OBJ).then(resp=>{
  this.loanreqno=Object.values(resp[0]);
  this.toastmessageService.presentAlert1("Request Sent","Your Loan Request with Ref No. "+this.loanreqno+" has been Saved Successfully!");

        console.log(this.loanreqno[0]);
        if(this.reqtype == 1){
          this.reqtype = this.reqtype
        }
        else{
          this.reqtype = '2';
        }


          this.workflowTable="HRMS_EMPLOYEE_LOAN_DETAILS";
          this.reqID=this.loanreqno;

          this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ this.reqID + "/" + this.reqtype + "/null/null/" + this.userid + "/1/" + this.workflowTable).then(resp=>{
            if (resp == "1") {
              console.log("Workflow called successfully :" + resp);

            } else {
              // console.log("Workflow not called:" + resp);
            }
          }, error => {

          console.log("error : "+JSON.stringify(error));

          });
          this.reqtype="";
          this.loanScheme="";
          this.loanname="";
          this.maxinstallment="";
          this.loancode="";
          this.maxligiblity="";
          this.intrate="";
          this.loanamount="";
          this.cureligiblity="";
          this.emiamount="";
          this.advamount="";
          this.installments="";
          this.mondeduct="";

  }, error => {

  console.log("error : "+JSON.stringify(error));

  });


  }
  loanList(){
    this.router.navigateByUrl('/hrmsloan-summary');

  }
}
