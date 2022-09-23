import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { ModalController } from '@ionic/angular';
import { DatePipe} from '@angular/common';
import {ApplicantionEditeducationPage} from '../../Hrms_pages/applicantion-editeducation/applicantion-editeducation.page';

@Component({
  selector: 'app-applicanteducationdetail',
  templateUrl: './applicanteducationdetail.page.html',
  styleUrls: ['./applicanteducationdetail.page.scss'],
})
export class ApplicanteducationdetailPage implements OnInit {
  userId;
  usertoken;
  token;
  FUNCTION_ID;
  hrmedudetaiscat1;
  hrmedudetaiscat=[];
  ghighqualification;
  referId;
  yeardropi;
  yeardata=[];
  category;
  specialization;
  remarks;
  fromdate;
  toDate;
  percentage;
  institution;
  educationdetails1;
  educationdetails:any;
  masterid;
  appilcantplus;
  member_refid;
  hrmjobcategory1;
  agencyname1
  agencyname;
  locprefdetails1;
  locprefdetails;
  hrmjobcategory;
  username = window.localStorage.getItem('TUM_USER_NAME');

  constructor(public modalController: ModalController,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.member_refid = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.ghighqualification="";
    this.category="";
    this.fromdate="";
    this.toDate="";
    this.getAgencyName();
    this.getHighestQualification();
    this.getJobCategory();
    this.getLocationRefrence();
    this.getemploymentdesign();
    this.getskillcatdetail();
    this.getemploymentmappedto();
    this.getskillratingdetail();
    this.geteducation();
    // this.getgeneraldetail();
    this.getupdateskilldetail();
    this.getupdateemploymentdetail();
    this.getHighestQualification();
 this.referId=localStorage.getItem('finalid');
 this.getYear();
  }

  ngOnInit() {
  }
  getHighestQualification(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmeducationcategory/",datag).then(resp=>{
      this.hrmedudetaiscat1 =resp;
      this.hrmedudetaiscat1.forEach(element => {
        this.hrmedudetaiscat.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getemploymentdesign(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentdesign/",datag).then(resp=>{
      console.log(resp);
    })
  }
  // getupdateid(){
  //   var datag = {
  //     access_token:this.token,
  //     userid:this.userId,
  //      usertoken:this.usertoken,
  //    }
  //   this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantid/",datag).then(resp=>{
  //     console.log(resp);
  //     this.masterid = resp[0].serial_no;
  //     this.appilcantplus = parseInt(this.masterid) + 1;
  //     var datagbmu = {
  //       access_token:this.token,
  //       userid:this.userId,
  //        usertoken:this.usertoken,
  //        applicantidu:this.appilcantplus
  //      }
  //      console.log(datagbmu);
  //     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantidupdate/",datagbmu).then(resp=>{
  //       console.log(resp);
  //       this.member_refid = resp[0][""];
  //      })
  //   })
  // }
  getskillcatdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillcatdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getemploymentmappedto(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentmappedto/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getskillratingdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillratingdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  geteducation(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
     console.log(datag);
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"geteducation/",datag).then(resp=>{
      console.log(resp);
      this.educationdetails =resp;
    })
  }
  getupdateemploymentdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateemploymentdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getupdateskilldetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateskilldetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getAgencyName(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"agencynameapi/",datag).then(resp=>{
      console.log(resp);
      this.agencyname1 =resp;
      this.agencyname1.forEach(element => {
        this.agencyname.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  // getHighestQualification(){
  //   var datag = {

  //     access_token:this.token,
  //     userid:this.userId,
  //      usertoken:this.usertoken,
  //      functid:this.FUNCTION_ID
  //    }
  //   this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmeducationcategory/",datag).then(resp=>{
  //     this.hrmedudetaiscat1 =resp;
  //     this.hrmedudetaiscat1.forEach(element => {
  //       this.hrmedudetaiscat.push(element);
  //     });
  //    }, error => {

  //    console.log("error : "+JSON.stringify(error));

  //    });
  // }

  getLocationRefrence(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"locationpreference/",datag).then(resp=>{
      this.locprefdetails1 =resp;
      this.locprefdetails1.forEach(element => {
        this.locprefdetails.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getJobCategory(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmjobcategory/",datag).then(resp=>{
      this.hrmjobcategory1 =resp;
      this.hrmjobcategory1.forEach(element => {
        this.hrmjobcategory.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getYear(){
    var range = [];
var start = 1900;
var end = new Date().getFullYear();
var options = "";
for(var year = start ; year <=end; year++){
  this.yeardropi=year;

  this.yeardata.push()
  range.push(this.yeardropi);
  //console.log(this.yeardrop);
}
this.yeardropi = range;
  }
  saveEducationDetails(){
    if(this.referId!=undefined && this.referId!=''){

      if(this.category == undefined){
        this.category='';
      }
      if(this.specialization==undefined){
        this.specialization='';
      }
      if(this.remarks==undefined){
        this.remarks='';
      }
     var fromdte =this.datepipe.transform(this.fromdate,'yyyy/MM/dd')
    var todte = this.datepipe.transform(this.toDate,'yyyy/MM/dd')
  var datage = {
           access_token:this.token,
          userid:this.userId,
           usertoken:this.usertoken,
           functid:this.FUNCTION_ID,
           category:this.category,
           sepcialization:this.specialization,
           from:fromdte,
           to:todte,
           institution:this.institution,
           percentage:this.percentage,
           remarks:this.remarks,
          //  refrenceid:this.referId
          refrenceid:localStorage.getItem('refno')
         }
         // console.log(datage);

        //  this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"educationinsert/",datage).then(resp=>{
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateeducationinsert/",datage).then(resp=>{

          this.category="";
         this.specialization="";
         this.institution="";
         this.percentage="";
         this.remarks="";
          this.educationdetails1=resp;
          this.educationdetails1.forEach(element => {
            this.educationdetails.push(element);
          });
         }, error => {
           console.log("error : "+JSON.stringify(error));
         });

    }else{
      this.toastmessageService.presentAlert1("General","Fill general details")
   }
  }

  async editItem(value){
    const modal = await this.modalController.create({
      component: ApplicanteducationdetailPage,
      componentProps: {
        'item':value,
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      this.geteducation();
  });

    return await modal.present();
  }
}
