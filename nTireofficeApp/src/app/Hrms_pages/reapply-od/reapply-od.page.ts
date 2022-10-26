import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { json } from '@angular-devkit/core';
declare var $;

@Component({
  selector: 'app-reapply-od',
  templateUrl: './reapply-od.page.html',
  styleUrls: ['./reapply-od.page.scss'],
})
export class ReapplyOdPage implements OnInit {
  FUNCTION_ID: any;
  userID: any;
  usertoken: any;
  token: any;
  empCode: any;
  name: any;
  company: any;

  branch: any;
  item: any;
  requestref: any;
  item1: any;
  requestDate: any;
  dat_valid: { currentDate: Date; };
  fromdate: any;
  todate: any;
  fromhour: any;
  reason: any;
  nodays: any;
  Tohour: any;
  reqRef1: any;
  travelfrom: any;
  travelto: any;
  travelid: any;
  travelmode: any;
  traveldate: any;
  travelcomment: any;
  travelamount: any;
  frDate: any;

  fromYear: any;
  frDatesplit: any;
  frommonth: any;
  fromDate1: any;
  empID: any;
  travelReq =false;
  release=false;
  advance=false;
  disabledvalue = false;
  travelstatus: any;
  statusstatus: any;

  advancestatus: any;
  fromdateval: any;
  toDatesplit: any;
  toDate: any;
  toYear: any;
  toDate1: any;
  tomonth: any;
  todateval: any;
  AllTravelData: any[];
  TavelmodeType1:any;
  TavelmodeType1_res:any;
  TavelmodeType=[];
  fromPlace: any;
  toPlace: any;
  tavelDate: any;
  taveltext: any;
  travelComment: any;
  alldata: { travelfrom: any; travelto: any; travelmode: any; TRAVEL_MODEVAL: any; traveldate: any;
    travelcomment: any;    travelamount: any; };
    editfromPlace;
    edittoPlace;
    edittavelDate;
    edittravelComment;
    edittravelamount;
    edittravelmode;
    editfield:boolean;
    ReqRef;
    MobileNum;
  reqtype: string;
  constructor(private model:ModalController,navParams: NavParams,public modalCtrl: ModalController,private toastmessageService:ToastmessageService,private HttpRequest: HttprequestService,public Ipaddressservice: IpaddressService) {
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.token=window.localStorage['token'];
    this.userID = parseInt(window.localStorage['TUM_USER_ID']);
    this.usertoken= window.localStorage['usertoken'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.dat_valid= {
      currentDate: new Date()
    };
    this.item=navParams.get('item');
    this.item1 = navParams.get('item2');
    console.log(""+JSON.stringify(this.item));

    console.log(""+JSON.stringify(this.item1));
    this.requestref = this.item.ReqRef;
    this.requestDate = this.item.RDate;
    this.requestDate = this.item.RDate.split('/');
    this.requestDate = this.requestDate[2]+'-'+this.requestDate[1]+'-'+this.requestDate[0];
    console.log(""+this.requestDate)
    this.fromdate = this.item.FromDate;
    this.fromdate= this.item.FromDate.split('/');
    this.fromdate = this.fromdate[2]+'-'+this.fromdate[1]+'-'+this.fromdate[0];
    console.log(""+this.fromdate);
    this.todate = this.item.ToDate;
    this.todate = this.item.ToDate.split('/');
    this.todate = this.todate[2]+'-'+this.todate[1]+'-'+this.todate[0];
    this.fromhour = this.item.FromHours;
    this.Tohour = this.item.ToHours;
    this.nodays = this.item.NoDays;
    console.log(""+this.fromhour)
    console.log(""+this.nodays)
    this.reason = this.item.Reason;
    this.ReqRef = this.item.ReqRef;
     this.MobileNum = this.item.MobileNum;

    this.getTravelDetails();
    this.getTravelMode();
   }


  ngOnInit() {
  }
  saveeditTravel(data,index){

    this.AllTravelData[index].travelfrom=this.editfromPlace;
    this.AllTravelData[index].travelto=this.edittoPlace;
    this.AllTravelData[index].traveldate1=this.edittavelDate;
    this.AllTravelData[index].travelcomment=this.edittravelComment;

    this.AllTravelData[index].travelamount=this.edittravelamount;
    this.AllTravelData[index].travelmode=this.edittravelmode;
    this.AllTravelData[index].TRAVEL_MODEVAL=this.edittravelmode;

    this.TavelmodeType.forEach(element => {

      if(element.VAL==this.edittravelmode){

        this.AllTravelData[index].travelmode=element.TEXT;
      }

    });


    // $("#travelidvals" + index).css("display", "block");
    $("#editbtn" + index).css("display", "inline-table");

    $("#editfield" + index).hide();
    $("#checkmarkbtn" + index).hide();
   }
   deleteTravel(data,index){
    this.AllTravelData.splice(index, 1);

  }
  editTravel(data,index){
    console.log(""+JSON.stringify(data));
    console.log(""+JSON.stringify(data))

    $("#editfield" + index).show();

    $("#checkmarkbtn" + index).css("display", "inline-table");

    $("#editbtn" + index).hide();
    this.editfromPlace=data.travelfrom;
    this.edittoPlace=data.travelto;

    this.edittavelDate = data.traveldate.substring(0, 10);


    this.edittravelComment=data.travelcomment;
    this.edittravelamount=data.travelamount;
    // this.edittravelmode=data.travelmode;
    this.edittravelmode=data.TRAVEL_MODEVAL;
   }


  getTravelMode(){
    var travelobj={
      'FunctionID': parseInt(this.FUNCTION_ID),
      'access_token':this.token,
      'userid': parseInt(this.userID),
      'usertoken':this.usertoken
    }

  this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getTravelMode",travelobj).then(resp=>{
  console.log(JSON.stringify(resp));
    this.TavelmodeType1_res=resp;
    this.TavelmodeType1 = this.TavelmodeType1_res;
    this.TavelmodeType1.forEach(element => {
      this.TavelmodeType.push(element);
    });
   }, error => {

   console.log("error : "+JSON.stringify(error));

   });
   }

   closemodel(index) {
    if (index == 1) {
      // this.modal1.hide();
      // modalCtrl.dismiss();
      this.modalCtrl.dismiss('cancel');
    } else if (index == 3) {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

  getTravelDetails()
  {
   var odref={
     User_ID:parseInt(this.item1.userid),
     RequestRef: parseInt(this.item.ReqRef),
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      usertoken:window.localStorage['usertoken'],
      access_token:window.localStorage['token']
     }

     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getTravelDetails",odref).then(resp=>{
       console.log(""+JSON.stringify(resp));
      this.AllTravelData=[];
      for(var i=0; i< resp['length'];i++){
        this.travelReq=true;
        this.AllTravelData.push({
          travelfrom: resp[i]['FromPlace'],
          travelto: resp[i]['ToPlace'],
          travelid :resp[i]['Travel_id'],

          traveldate :resp[i]['FromDate'],
          travelcomment :resp[i]['Comments'],
          travelamount :resp[i]['amount'],
          TRAVEL_TRAVELID:resp[i]['Travel_id'],
          travelmode:resp[i].TravelMode[1],
              TRAVEL_MODEVAL:resp[i].TravelMode[0],
              traveldate1:resp[i]['FromDate'],
        })
      }
      // if(this.AllTravelData.length>0){
      //   this.travelReq = true;
      // }
      console.log(""+JSON.stringify(this.AllTravelData));

       console.log(""+this.reqRef1);

     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  travelstatuschange(){
    console.log(this.travelReq,this.fromdate);
    if(this.travelReq == true){
      this.tavelDate = this.fromdate;
      console.log(this.tavelDate);
    }
  }

  validateToDate(event){

    // this.traveldate = this.fromdate;

    var date1 = this.fromdate;
    var date2 = this.todate;
    if (date1 != undefined) {
      // console.log("To")
      if (date1 > date2) {
      alert("To date should be greater than from date");
      this.todate = "";
      } else {

         var fromDate =new Date(this.fromdate);
         var toDate = new Date(event.target.value);


      // To calculate the time difference of two dates
      var Difference_In_Time = fromDate.getTime() - toDate.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


      this.nodays=-Difference_In_Days+1;
      }
    }
  }


  addTravel(){

    if (this.fromPlace == undefined) {
  this.toastmessageService.presentAlert1("Alert","From place need not to be empty");
 } else if(this.toPlace == undefined) {
  this.toastmessageService.presentAlert1("Alert","To place need not to be empty");

 } else if(this.tavelDate == undefined) {
  this.toastmessageService.presentAlert1("Alert","Travel Date need not to be empty");

 } else if(this.travelmode == "") {
  this.toastmessageService.presentAlert1("Alert","Travel Mode need not to be empty");

 }
 else{

 for(var i=0; i<this.TavelmodeType.length; i++){

  if(this.TavelmodeType[i].VAL==this.travelmode){
    this.taveltext=this.TavelmodeType[i].TEXT;
  }

 }
  var tarveldata={
    travelfrom:this.fromPlace,
    travelto:this.toPlace,
    travelmode:this.taveltext,
   TRAVEL_MODEVAL:this.travelmode,
   traveldate:new Date(this.tavelDate).toISOString(),
   traveldate1:this.tavelDate,

   travelcomment:this.travelComment,
   travelamount:this.travelamount,
   travelid :this.travelmode,

 }
 console.log(tarveldata)
 // let datatravel = angular.extend(data,traveldata);
 this.alldata=tarveldata;
 this.AllTravelData.push(this.alldata);
 this.fromPlace=undefined;
 this.toPlace=undefined;
 this.tavelDate=undefined;
 this.travelmode=undefined;
 this.travelComment=undefined;
 this.travelamount=undefined;
 console.log(this.AllTravelData)
 }
}

changetraveldate(val){
  this.traveldate = this.fromdate;
}

closeModal(index) {
  if (index == 1) {
    // this.modal1.hide();
    // modalCtrl.dismiss();
    this.modalCtrl.dismiss('cancel');
  } else if (index == 3) {
    this.modalCtrl.dismiss('cancel');
    // modalCtrl.dismiss();
  } else {
    this.modalCtrl.dismiss('cancel');
    // modalCtrl.dismiss();
  }
};

  submitoddetailsupdate(){

    if(this.travelReq ==true || this.AllTravelData.length>0)
    {
     this.travelstatus= 'Y';
    }
    else{
     this.travelstatus= 'N';
    }
    if(this.release ==true)
    {
     this.statusstatus= 'P';
    }
    else{
     this.statusstatus= 'N';
    }
    if(this.advance ==true)
    {
     this.advancestatus= 'Y';
    }
    else{
     this.advancestatus= 'N';
    }

    this.frDate =this.fromdate;

    this.fromdate = new Date(this.fromdate);
    this.fromdate = this.fromdate.toISOString();

 this.empID = window.localStorage['empid'];

 this.travelstatus=this.travelReq;
 this.statusstatus=this.statusstatus;
 this.advancestatus=this.advance;


 console.log(this.fromdate)

 this.toDate =this.todate;
 console.log(this.toDate);
 this.toDate = new Date(this.toDate);
 this.toDate = this.toDate.toISOString();
 console.log(""+this.toDate);

var fromhour = this.fromhour;
console.log(fromhour);

var tohour = this.Tohour;
console.log(tohour);

 console.log(this.item);
 var dataobj={
   Fromdate:this.fromdate,
   // Fromdate:new Date(this.fromDate1),
  todate: this.toDate,
   nodays:this.nodays,
   fromhours:this.fromhour,
   tohours:this.Tohour,
   reason:this.reason,
   // reason:this.reason,

   // reqref:this.ReqRef,
  //  contactphone:this.contactphone,
   currentstatus:this.statusstatus,
   empname:this.name,
   RequestRef: parseInt(this.item.ReqRef),
  //  MobileNum:this.,
    userid: parseInt(window.localStorage['TUM_USER_ID']),
    usertoken:window.localStorage['usertoken'],
    access_token:window.localStorage['token'],


   }
// let datatravel = angular.extend(dataobj);
console.log(dataobj)

// this.travelarray=[];
// this.travelarray.push(dataobj)

// this.travelarray.push(this.AllTravelData)
this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getODUpdateDate",dataobj).then(resp=>{
  console.log(resp);
  console.log(""+JSON.stringify(resp));
  // this.reqRefDetail = JSON.stringify(resp);
  if(resp == "updated success")
  {
    this.toastmessageService.presentAlert1("","OD Updated Successfully");
    this.modalCtrl.dismiss();
    if(this.travelstatus=='Y'){
    }



  }


},
error => {
  console.log(error.error.text,this.travelReq);

  if(error.error.text == 'updated success')
  {
    console.log("I'm IN",this.travelReq,this.travelstatus);
    this.toastmessageService.presentAlert1("","OD Updated Successfully");

    if(this.travelReq==true){
     console.log(this.AllTravelData);
        if(this.AllTravelData.length>0){
    for(var i=0;i<this.AllTravelData.length;i++){


      console.log(this.AllTravelData[i]);
        var travelidobj={
          userid: parseInt(window.localStorage['TUM_USER_ID']),
          usertoken:window.localStorage['usertoken'],
          access_token:window.localStorage['token']
        }
      console.log(this.AllTravelData[i].TRAVEL_TRAVELID);
      if(this.AllTravelData[i].TRAVEL_TRAVELID){
       if(this.travelReq == true){
         this.travelstatus = "Y"
       }

      var travelinsertobj={
        companyid:window.localStorage['FUNCTION_ID'],
        user_id:window.localStorage['TUM_USER_ID'],
        requestref:this.ReqRef,
        type:'o',
        travelid:this.AllTravelData[i].TRAVEL_TRAVELID,
        fromplace:this.AllTravelData[i].travelfrom,
        toplace:this.AllTravelData[i].travelto,
        fromdate:this.AllTravelData[i].traveldate,
        travelmode:this.AllTravelData[i].TRAVEL_MODEVAL,
        travelclass:0,
        create:window.localStorage['TUM_USER_ID'],
        ipaddress:0,
        comments:this.AllTravelData[i].travelcomment,
        amount:this.AllTravelData[i].travelamount,
        strCancelRemarks:'',
        lastupby:window.localStorage['TUM_USER_ID'],
        userid: parseInt(window.localStorage['TUM_USER_ID']),
        usertoken:window.localStorage['usertoken'],
        access_token:window.localStorage['token'],
        travelreq:this.travelstatus
      }
    console.log('travelinsertobj : '+JSON.stringify(travelinsertobj));

      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"update_travel/",travelinsertobj).then(resp=>{
        console.log("getTravelMode ;"+JSON.stringify(resp));
         if(this.AllTravelData.length==i){
          this.AllTravelData=[];
        }

         }, error => {
          if(error['error'].text == "updated success")
          {
            if(this.release==true){
              var reapplyod = {

                reqID:this.ReqRef,
                 MobileNum:this.MobileNum,
                 userID:window.localStorage['TUM_USER_ID'],
                  usertoken:window.localStorage['usertoken'],
                  access_token:window.localStorage['token'],
                  workflowTable: "HRMS_ATTODREQUEST",
                   }
                   this.reqtype = 'null';
              this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ reapplyod.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + reapplyod.workflowTable).then(resp=>{
                if (resp == "1") {
                  console.log("Workflow called successfully :" + resp);

                } else {
                  // console.log("Workflow not called:" + resp);
                }

              }, error => {

              console.log("error : "+JSON.stringify(error));

              });
            }
            }

         });

    }else{
      var travelidobj={
        userid: parseInt(window.localStorage['TUM_USER_ID']),
        usertoken:window.localStorage['usertoken'],
        access_token:window.localStorage['token']
      }
      var self=this;
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"/getTravelID/",travelidobj).then(resp=>{
        this.travelid=resp[0].TravelId;
        for(var i=0;i<this.AllTravelData.length;i++){
          if(!this.AllTravelData[i].TRAVEL_TRAVELID){
        console.log("od data"+JSON.stringify(this.AllTravelData[i]));

        // var travelYear=this.AllTravelData[i].TRAVEL_DATE.split('-');
        var traveldatesplit=self.AllTravelData[i].traveldate;

          //  var travelmonth=travelmonth+1;
         // var traveldate=travelYear+'-'+travelDate1+'-'+travelmonth;


     var travelinsertobj={

        companyid:window.localStorage['FUNCTION_ID'],
        user_id:window.localStorage['TUM_USER_ID'],
        requestref:this.ReqRef,
        type:'o',
        travelid:self.travelid,
        fromplace:self.AllTravelData[i].travelfrom,
        toplace:self.AllTravelData[i].travelto,
        fromdate:traveldatesplit,
        travelmode:self.AllTravelData[i].TRAVEL_MODEVAL,
        travelclass:0,
        create:window.localStorage['TUM_USER_ID'],
        ipaddress:0,
        comments:self.AllTravelData[i].travelcomment,
        amount:self.AllTravelData[i].travelamount,
        strCancelRemarks:'',
        lastupby:window.localStorage['TUM_USER_ID'],
        userid: parseInt(window.localStorage['TUM_USER_ID']),
        usertoken:window.localStorage['usertoken'],
        access_token:window.localStorage['token'],
        travelreq:"Y"

     }
     console.log('travelinsertobj : '+JSON.stringify(travelinsertobj));
     // console
     this.HttpRequest.PostRequest(self.Ipaddressservice.ipaddress +self.Ipaddressservice.serviceurlhrms2+"update_travel/",travelinsertobj).then(resp=>{
      if(this.AllTravelData.length==i){
        this.AllTravelData=[];
      }
     }, error => {
      if(error['error'].text == "updated success")
  {
    if(this.release==true){
      var reapplyod = {

        reqID:this.ReqRef,
         MobileNum:this.MobileNum,
         userID:window.localStorage['TUM_USER_ID'],
          usertoken:window.localStorage['usertoken'],
          access_token:window.localStorage['token'],
          workflowTable: "HRMS_ATTODREQUEST",
           }
           this.reqtype = 'null';
      this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ reapplyod.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + reapplyod.workflowTable).then(resp=>{
        if (resp == "1") {
          console.log("Workflow called successfully :" + resp);

        } else {
          // console.log("Workflow not called:" + resp);
        }

      }, error => {

      console.log("error : "+JSON.stringify(error));

      });
    }
    }
     });
    }

    }
         }, error => {

         console.log("error : "+JSON.stringify(error));

         });
    }


    }

}
else{
  if(error['error'].text == "updated success")
  {
    if(this.release==true){
      var reapplyod = {

        reqID:this.ReqRef,
         MobileNum:this.MobileNum,
         userID:window.localStorage['TUM_USER_ID'],
          usertoken:window.localStorage['usertoken'],
          access_token:window.localStorage['token'],
          workflowTable: "HRMS_ATTODREQUEST",
           }
           this.reqtype = 'null';
      this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ reapplyod.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + reapplyod.workflowTable).then(resp=>{
        if (resp == "1") {
          console.log("Workflow called successfully :" + resp);

        } else {
          // console.log("Workflow not called:" + resp);
        }

      }, error => {

      console.log("error : "+JSON.stringify(error));

      });
    }
    }
}
}
  else{
    if(this.release==true){
      var reapplyod = {

        reqID:this.ReqRef,
         MobileNum:this.MobileNum,
         userID:window.localStorage['TUM_USER_ID'],
          usertoken:window.localStorage['usertoken'],
          access_token:window.localStorage['token'],
          workflowTable: "HRMS_ATTODREQUEST",
           }
           this.reqtype = 'null';
      this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ reapplyod.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + reapplyod.workflowTable).then(resp=>{
        if (resp == "1") {
          console.log("Workflow called successfully :" + resp);

        } else {
          // console.log("Workflow not called:" + resp);
        }

      }, error => {

      console.log("error : "+JSON.stringify(error));

      });
    }
           }

           this.modalCtrl.dismiss();

  };

  });


}

refresh(){
  this.fromDate1 = undefined;
  this.toDate1 = undefined;
  this.reason = undefined;
  this.fromhour = undefined;
  this.Tohour = undefined;
  this.fromdate = undefined;
  this.todate = undefined;
  this.nodays = undefined;
  // this.od.status = 'N';
  // this.od.travelRequired = 'N';
  // this.od.advance = 'N';
  // this.od.advanceAmount = undefined;
  // this.od.advanceCurrency = undefined;
  // this.od.repayment = undefined;
  // this.od.advanceInstallment = undefined;
  // this.nodays = undefined;
  this.fromPlace=undefined;
  this.toPlace=undefined;
  this.tavelDate=undefined;
  this.travelmode=undefined;
  this.travelComment=undefined;
  this.travelamount=undefined;
  setTimeout(function(){
    this.AllTravelData=[];
  }, 2000);
}
}
