import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { ModalController,NavParams } from '@ionic/angular';
@Component({
  selector: 'app-applicationeditskillsdetails',
  templateUrl: './applicantioneditskillsdetails.page.html',
  styleUrls: ['./applicantioneditskillsdetails.page.scss'],
})
export class ApplicationeditskillsdetailsPage implements OnInit {
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
  item;
  username:any = window.localStorage.getItem('TUM_USER_NAME');
  constructor(navParams: NavParams,public modalController: ModalController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.referId = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.category="";
    this.rating="";

    this.getSkillCategory();
    this.getratings();
    this.item=navParams.get('item');
    console.log("this.item"+JSON.stringify(this.item));
    this.category=parseInt(this.item.asd_skill_cat);
    this.skills=this.item.asd_skill_name;
    this.use=this.item.asd_years_of_exp;
    this.worked=parseInt(this.item.asd_last_used);
    this.rating=parseInt(this.item.asd_rating);
    this.remarks=this.item.asd_remarks;
  }

  ngOnInit() {
  }
  closemodel() {

    this.modalController.dismiss();

};
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
saveSkillsDetails(){

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
         refrenceid:this.referId,
         skillcat: this.category,
         skillnme:this.skills,
       }
       this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"modalskillinsert/",datagees).then(resp=>{
        this.category="";

        this.skills=undefined;
        this.use=undefined;
        this.worked=undefined;
        this.rating="";
        this.remarks=undefined;
        this.toastmessageService.presentAlert1("","Updated Successfully");
        this.modalController.dismiss();


       }, error => {
         console.log("error : "+JSON.stringify(error));
       });


       // console.log(datagees);

}
}
