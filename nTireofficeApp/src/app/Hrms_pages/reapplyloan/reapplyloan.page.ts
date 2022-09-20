import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NavParams,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-reapplyloan',
  templateUrl: './reapplyloan.page.html',
  styleUrls: ['./reapplyloan.page.scss'],
})
export class ReapplyloanPage implements OnInit {
  userid: any;
  usertoken: any;
  token: any;
  empID: any = window.localStorage.getItem('empid');
  empCode: any;
  FUNCTION_ID: any;
  userID: any;
  em_emp_id: any;schemeid:any;
  emiamount:any;
  name: any;
  company: any;
  branch:any;
  schemes=[];
  schemes1;
  designationemp: any;
  empname: any;
  department: any;
  designation: any;

  designationid: any;
  // urldata: import("d:/APPLICATION/Suriya/COBA-ionic4/Mydesk/node_modules-1/rxjs-compat/umd").Subscription;
  loandata: any;
  urldata:any;
  item: any;
  reqtype: any;
  maxinstallment: any;
  mondeduct: any;
  loanamount: any;
  gradeslist: any;
  grade: any;
  loandetails: any;
  loanname: any;
  maxligiblity: any;
  loancode: any;
  intrate: any;
  amountdetails: any;
  cureligiblity: number;
  loanreqno: any;
  advamount: any;
  installments: any;
  loanScheme: any;
  release: any;
  status: string;
  resp1: any;

  constructor(private model:ModalController,navParams: NavParams,private router: Router,private route:ActivatedRoute,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.token=window.localStorage['token'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken= window.localStorage['usertoken'];
    this.em_emp_id=window.localStorage['em_emp_id'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];

    this.getDesignation();
    this.item=navParams.get('item');
    console.log(""+JSON.stringify(this.item));

    this.reqtype = this.item.request_type;
      this.loanScheme = this.item.scheme_id;
      this.maxinstallment = this.item.max_installments;
      this.installments = this.item.max_installments;
      this.loanreqno=  this.item.req_id;
      this.reqtype = this.item.request_type;
      // this.advamount = this.item.amount;

     this.changescheme(this.loanScheme);
      this.loanamount = this.item.amount;
      this.mondeduct = this.item.monthly_deduction;
      // this.loanname =
      // this.item.scheme_id= this.item.scheme_id;

      console.log(""+this.mondeduct)

    this.urldata = this.route.params.subscribe(params => {
      console.log(params);
      this.loandata=params.item;


      console.log(""+this.loandata);
      this.release=false;
      // if(this.loandata!=undefined){
      // this.loanreqno= this.loandata.RequestRef;
      // loanreqno
      // this.reqtype =
      // this.loanScheme =
      // this.loanname =
      // this.maxinstallment =
      // this.maxligiblity =
      // this.intrate  =
      // this.loanamount =
      // this.cureligiblity  =
      // this.advamount =

      // this.installments =
      // this.mondeduct =
      //   // RequestDate
      //   // Status
      // }
   });
  }

  ngOnInit() {
  }

  closemodel(index) {
    if (index == 1) {
      // this.modal1.hide();
      // modalCtrl.dismiss();
      this.model.dismiss('cancel');
    } else if (index == 3) {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

  loanSubmit() {

    if(this.release ==true)
    {
     this.status= 'P';
    }
    else{
     this.status= 'N';
    }

    if (this.reqtype == 2) {
var amount = this.advamount;
var moninstall = this.installments;
var schemeid = 0;
this.emiamount = this.mondeduct;
} else {
  // var schemeid = 0;
schemeid = this.loanScheme;
var amount = this.loanamount;
var moninstall = this.maxinstallment;
this.emiamount = this.mondeduct;
}

var OBJ = {

EMPID: window.localStorage['empid'],
REQUESTTYPE: this.reqtype,
SCHEMEID: schemeid,
MAXINSTALL: moninstall,
AMOUNT: amount,
STATUS:this.status,
MONTHLYDEDUCTION: this.emiamount,
USERID: this.userID,
// Updatedon: new Date(),
REQID:window.localStorage['REQ_ID'],
access_token:window.localStorage['token'],
userid:this.userID,
usertoken:this.usertoken

}
console.log(OBJ)
if (this.loanamount > this.maxligiblity) {

  this.toastmessageService.presentAlert1("","Loan Amount Is Greater Than Current Eligibility");

    }else{

    if (this.loanamount <= this.maxligiblity) {

      var emiinterest =this.loanamount + (this.loanamount * this.intrate / 100);
      var EMI = emiinterest / this.maxinstallment;
      this.emiamount = EMI;
      console.log(""+this.emiamount);

    }

this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateLoanDetail/",OBJ).then(resp=>{
  // this.gradeslist = resp;
  console.log(""+resp);
  if(resp == 'Successfully Updated')
  this.toastmessageService.presentAlert1("Request Sent","Successfully Updated");
  // this.grade = this.gradeslist[0].grade;
  // console.log(this.grade)

  alert("Successfully Updated");
 }, error => {

 console.log("error : "+JSON.stringify(error));
 this.resp1 = error["error"].text

 if(this.resp1 == 'Successfully Updated')
 {

 this.toastmessageService.presentAlert1("Request Sent","Successfully Updated");
 }

 var assetobj={
  // reqtype:this.loan.reqtype,
   reqID:window.localStorage['REQ_ID'],
   workflowTable:"HRMS_EMPLOYEE_LOAN_DETAILS",
   userID:window.localStorage['TUM_USER_ID'],
   usertoken:window.localStorage['usertoken'],
   access_token:window.localStorage['token']
 }
 if(this.reqtype == 1){
   this.reqtype =  this.reqtype
 }
 else{
  this.reqtype = 'null';
 }

 this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ assetobj.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + assetobj.workflowTable).then(resp=>{
  console.log(resp);
  console.log("Workflow Called");
 },error => {

 });

 });

  }
}

  getadvanceemi(){
    var advamount =this.advamount;
    var advinstalmnts = this.installments;
    var AdvEMI = advamount / advinstalmnts;
    this.mondeduct = AdvEMI;
  }

  async changescheme(val){
    var schemeid = val;
    console.log(schemeid)
    var desigid = window.localStorage['desig_id'];
     var getobj1={
      scheme_id:schemeid,
      desigid:desigid,
      userid: this.userID,
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


 async loanDetailsFunction(grade,schemeid){
    var func_id = 1;
var getloan={
   scheme_id:schemeid,
   grade:grade,
   func_id:func_id,
   userid: this.userID,
   usertoken:this.usertoken,
   access_token:this.token
   }
   await this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getloandetails/",getloan).then(resp=>{
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
     userid: this.userID,
     usertoken:this.usertoken,
     access_token:this.token
     }
    await this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getamountdetails/",getamt).then(resp=>{
      this.amountdetails = resp;
      this.loanamount =this.amountdetails[0].totalamount;
       // console.log(this.amountdetails);
      this.cureligiblity =this.maxligiblity -this.loanamount;
       window.localStorage['cureligiblity']=this.cureligiblity;

      }, error => {

      console.log("error : "+JSON.stringify(error));

      });
 }

  getDesignation(){

    var obj1={
      emp_code:this.empCode,
      userid:this.userID,
     usertoken:this.usertoken,
     access_token:this.token
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getdesignation/",obj1).then(resp=>{
      this.designationemp = resp;
      console.log(""+this.designationemp );
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

  loanscheme(val){

    var DESIGNATION = val;
    console.log(DESIGNATION)
    var loanobj={
     DESIGNATION:DESIGNATION,
     userid: this.userID,
     usertoken:this.usertoken,
     access_token:this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getloanscheme/",loanobj).then(resp=>{
      this.schemes1 = resp;
      this.schemes1.forEach(element => {
        this.schemes.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

}
