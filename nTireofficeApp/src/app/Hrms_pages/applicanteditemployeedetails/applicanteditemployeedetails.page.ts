import { Component, OnInit } from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular';

import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe} from '@angular/common';
@Component({
  selector: 'app-applicanteditemployeedetails',
  templateUrl: './applicanteditemployeedetails.page.html',
  styleUrls: ['./applicanteditemployeedetails.page.scss'],
})
export class ApplicanteditemployeedetailsPage implements OnInit {
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
  item;
  map_id;
  constructor(navParams: NavParams,public modalController: ModalController,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.member_refid = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.referId=localStorage.getItem('refno');

  this.item=navParams.get('item');
  console.log("this.item"+JSON.stringify(this.item));
  this.employer=this.item.aem_company_name;
  this.fromdate=new Date(this.item.aem_period_from).toISOString().split('T')[0];


  // this.toDate=this.datepipe.transform(this.item.aem_period_to,'yyyy/MM/dd').toString()
  this.toDate=new Date(this.item.aem_period_to).toISOString().split('T')[0];
  this.totalperiod=this.item.aem_total_months;
  this.designation=this.item.aem_designation1;
  this.mappedto=parseInt(this.item.aem_designation);

  this.map_id=this.item.aem_designation;
  this.salary=this.item.aem_salary_drawn;
  this.remarks=this.item.aem_remarks;
    this.getMappedto();
  }

  ngOnInit() {
  }
  closemodel() {

    this.modalController.dismiss();

};
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
saveEmployeeDetails(){

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
           refrenceid:this.referId,
           uemployer:this.employer,
           udesign:this.map_id
         }
         this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"modalemploymentinsert/",datagee).then(resp=>{
          this.totalperiod=undefined;
          this.fromdate="";
          this.toDate="";
          this.designation=undefined;
          this.mappedto=undefined;
          this.salary=undefined;
          this.remarks=undefined;
          this.toastmessageService.presentAlert1("","Updated Successfully");
    this.modalController.dismiss();
         }, error => {
           console.log("error : "+JSON.stringify(error));
         });

        }


}
