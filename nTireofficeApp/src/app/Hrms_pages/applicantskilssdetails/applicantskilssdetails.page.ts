import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { ModalController } from '@ionic/angular';
import { ApplicationeditskillsdetailsPage } from '../applicantioneditskillsdetails/applicantioneditskillsdetails.page';
// import {ApplicationeditskillsdetailsPage} from '../applicantskilssdetails/a'
@Component({
  selector: 'app-applicantskillsdetails',
  templateUrl: '../applicantskilssdetails/applicantskilssdetails.page.html',
  styleUrls: ['../applicantskilssdetails/applicantskilssdetails.page.scss'],
})
export class ApplicantskillsdetailsPage implements OnInit {
  userId;
  usertoken;
  token;
  FUNCTION_ID;
  hrmskillcat1;
  hrmskillcat=[];
  hrmskillrating1;
  hrmskillrating=[];
  referId;
  remarks;
  category;
  skills;
  use;
  worked;
  rating;
  skilldetails1;
  skilldetails;
  employmentdetails;
  hrmjobcategory1;
  hrmjobcategory;
  agencyname1;
  agencyname;
  locprefdetails1;
  locprefdetails;
  member_refid;
  constructor(public modalController: ModalController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.member_refid = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.category="";
    this.rating="";
    this.referId=localStorage.getItem('finalid');
    this.getSkillCategory();
    this.getratings();

    this.getAgencyName();
    this.getJobCategory();
    this.getLocationRefrence();
    this.getemploymentdesign();
    this.getemploymentmappedto();
    this.geteducation();
    this.geteducationcategory();
    this.getupdateskilldetail();
    this.getupdateemploymentdetail();
    this.getemploymentdesign();
  }

  ngOnInit() {
  }
  getSkillCategory(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillcatdetail/",datag).then(resp=>{
      this.hrmskillcat1=resp;
      this.hrmskillcat1.forEach(element => {
        this.hrmskillcat.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getratings(){
    var datag = {
       access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillratingdetail/",datag).then(resp=>{
      this.hrmskillrating1=resp;
      this.hrmskillrating1.forEach(element => {
        this.hrmskillrating.push(element);
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
      this.skilldetails = resp;
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
  saveSkillsDetails(){
    if(this.referId!=undefined && this.referId!=''){

      if(this.remarks==undefined){
        this.remarks='';
      }
      var datagees = {

          //functionid:$scope.functionid,
          access_token:this.token,
          userid:this.userId,
          usertoken:this.usertoken,
          functid:this.FUNCTION_ID,
           category:this.category,
           skills:this.skills,
           yearofuse:this.use,
           lastworked:this.worked,
           rating:this.rating,

           remarks:this.remarks,
           refrenceid:this.referId
         }
         this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"skillinsert/",datagees).then(resp=>{
          this.category="";

          this.skills=undefined;
          this.use=undefined;
          this.worked=undefined;
          this.rating="";
          this.remarks=undefined;
      this.skilldetails1=resp;
      this.skilldetails1.forEach(element => {
        this.skilldetails.push(element);
      });
         }, error => {
           console.log("error : "+JSON.stringify(error));
         });

    }
    else{
      this.toastmessageService.presentAlert1("General","Fill general details");
    }
         // console.log(datagees);

  }
  async editItem(value){
    const modal = await this.modalController.create({
      component: ApplicationeditskillsdetailsPage,
      componentProps: {
        'item':value,

      }

    });
    modal.onDidDismiss()
    .then((data) => {
      this.getupdateskilldetail();
  });

    return await modal.present();
  }
}
