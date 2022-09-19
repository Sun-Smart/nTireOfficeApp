import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe} from '@angular/common';
import { ModalController } from '@ionic/angular';
import {ApplicanteditemployeedetailsPage} from '../applicanteditemployeedetails/applicanteditemployeedetails.page'
@Component({
  selector: 'app-applicantemploymentdetails',
  templateUrl: './applicantemploymentdetails.page.html',
  styleUrls: ['./applicantemploymentdetails.page.scss'],
})
export class ApplicantemploymentdetailsPage implements OnInit {
  userId;
  usertoken;
  token;
  FUNCTION_ID;
  hrmedudetaiscat1;
  hrmedudetaiscat=[];
  hrmmappedto1;
  hrmmappedto=[];
  referId;
  salary;
  remarks;
  fromdate;
  toDate;
  employer;
  totalperiod;
  designation;
  mappedto;
  employmentdetails;
  employmentdetails1;
  agencyname1;
  agencyname;
  hrmjobcategory1;
  hrmjobcategory;
  locprefdetails1;
  locprefdetails;
  member_refid;
  educationdetails;

  constructor(public modalController: ModalController,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.member_refid = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.referId=localStorage.getItem('finalid');
    this.designation="";
  this.mappedto="";
  this.fromdate="";
  this.toDate="";
    this.getDesignation();
    this.getMappedto();

    this.getAgencyName();
    //this.getHighestQualification();
    this.getJobCategory();
    this.getLocationRefrence();
    this.getskillcatdetail();
    // this.getskillratingdetail();
    this.geteducation();
    // this.getgeneraldetail();
   // this.getupdateskilldetail();
    this.getupdateemploymentdetail();
    //this.getHighestQualification();
    this.geteducationcategory();
  }

  ngOnInit() {
  }
  getDesignation(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentdesign/",datag).then(resp=>{
      this.hrmedudetaiscat1 =resp;
      this.hrmedudetaiscat1.forEach(element => {
        this.hrmedudetaiscat.push(element);
        console.log(""+this.hrmedudetaiscat)
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  getMappedto(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentmappedto/",datag).then(resp=>{
      this.hrmmappedto1 =resp;
      this.hrmmappedto1.forEach(element => {
        this.hrmmappedto.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
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
      this.employmentdetails = resp;
    })
  }
  geteducationcategory(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmeducationcategory/",datag).then(resp=>{
      console.log(resp);
    })
  }
  async editItem(value){
    const modal = await this.modalController.create({
      component: ApplicanteditemployeedetailsPage,
      componentProps: {
        'item':value,

      }

    });
    modal.onDidDismiss()
    .then((data) => {
      this.getupdateemploymentdetail();
  });

    return await modal.present();
  }
  saveEmployeeDetails(){
    console.log(this.referId);
    if(this.referId!=undefined && this.referId!=''){

        if(this.salary==undefined){
          this.salary='';
        }
        if(this.remarks==undefined){
          this.remarks='';
        }
        var fromdte =this.datepipe.transform(this.fromdate,'yyyy/MM/dd')
    var todte = this.datepipe.transform(this.toDate,'yyyy/MM/dd')
    var datagee = {

            //functionid:this.functionid,
            access_token:this.token,
            userid:this.userId,
             usertoken:this.usertoken,
             functid:this.FUNCTION_ID,
             employer:this.employer,
             totalperiods:this.totalperiod,
             from:fromdte,
             to:todte,
             designation:this.designation,
             mappedto:this.mappedto,
             salary:this.salary,
             remarks:this.remarks,
             refrenceid:this.referId
           }
           this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"employmentinsert/",datagee).then(resp=>{
            this.totalperiod=undefined;
            this.fromdate="";
            this.toDate="";
            this.designation=undefined;
            this.mappedto=undefined;
            this.salary=undefined;
            this.remarks=undefined;
        this.employmentdetails1=resp;
        this.employmentdetails1.forEach(element => {
          this.employmentdetails.push(element);
        });
           }, error => {
             console.log("error : "+JSON.stringify(error));
           });

      }
      else{
        this.toastmessageService.presentAlert1("General","Fill general details");
      }

    }
    }
