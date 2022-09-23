import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { AlertController ,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ReapplyleavePage} from '../reapplyleave/reapplyleave.page';


@Component({
  selector: 'app-leavesummary',
  templateUrl: './leavesummary.page.html',
  styleUrls: ['./leavesummary.page.scss'],
})
export class LeavesummaryPage implements OnInit {
  leavetypearray=[];
  leaveType;
  company;
  empID;
  FUNCTION_ID;
  em_emp_id;
  fromDate;
  toDate;
  display=[];
  error;
  display1=[];
  display2=[];
  status;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController,private router: Router,public alertController: AlertController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService,public loadingController: LoadingController,) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.empID=window.localStorage['em_emp_id'];
    this.FUNCTION_ID= window.localStorage['FUNCTION_ID'];
    this.em_emp_id=window.localStorage['em_emp_id'];
    this.status="";
    this.getLeaveType();
    this.filterDate(undefined,undefined);
   }

  ngOnInit() {
  }

  getLeaveType(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/LoadLeaveType/"+ this.FUNCTION_ID + "/" + this.em_emp_id).then(resp=>{
      this.leavetypearray = JSON.parse(resp.toString());
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  filterDate(fromdate,todate){
   this.display=[];
   this.presentLoadingWithOptions();
    if (fromdate == undefined ||fromdate == "") {
      fromDate = "01-01-1990";
      this.loadingdismiss();
    } else {
      var fromDate = this.formatDate(fromdate);
      this.loadingdismiss();
    }

    if (todate == undefined || todate == "") {
      toDate = "06-06-2079";
      this.loadingdismiss();
    } else {
      var toDate = this.formatDate(todate);
      this.loadingdismiss();
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "searchLeave/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + toDate).then(resp=>{

   this.loadingdismiss();
      if (resp != "No Records found") {

        this.display = JSON.parse(resp.toString());
        this.loadingdismiss();
        this.display1=JSON.parse(resp.toString());
        // console.log($scope.display)
        var status = this.display[0].Status;
        this.error = "";

      } else {


        this.display = [];
        this.error = "No Records Found";
        this.loadingdismiss();
      }
    }, error => {
    alert('Server Error, Data not loaded.')
    console.log("error : "+JSON.stringify(error));

this.loadingdismiss();
    });
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',


    });
    return await loading.present();
  }
  async   loadingdismiss() {

     return await this.loadingController.dismiss();
  }


  async openModal(value){
    // this.traveldetails={
    //  User_ID:this.Userid,
    //  ODRequestRef:this.ReqRef,
    //  TxnReference: this.reqRef1 ,
    //   userid:window.localStorage['TUM_USER_ID'],
    //   usertoken:window.localStorage['usertoken'],
    //   access_token:window.localStorage['token']
    // }
   console.log(""+JSON.stringify(value));
   // this.tempID = "1";
   const modal = await this.modalController.create({
     component: ReapplyleavePage,
     componentProps: {
       'item':value,
     }


   });
   modal.onDidDismiss()
    .then((data) => {
      this.filterDate(undefined,undefined);
  });

    return await modal.present();

 }

  setType(type){

    this.error=''
    this.display = this.display1.filter((data) => {
      if(this.display.length==0){
        this.error = "No data found";
      }
      return data.LeaveType.toLowerCase().indexOf(type.toLowerCase()) > -1;

    });

  }
  changeOrder(){
    if(this.fromDate!=undefined){
    var fromDate = this.formatDate(this.fromDate);
    var toDate = this.formatDate(this.toDate);
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "searchLeave/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + toDate).then(resp=>{

      this.loadingdismiss();
         if (resp != "No Records found") {

           this.display = JSON.parse(resp.toString());
           this.loadingdismiss();
           this.display2=JSON.parse(resp.toString());
           // console.log($scope.display)
           this.error=''
           this.display = this.display2.filter((data) => {
             if(this.display.length==0){
               this.error = "No data found";
             }
             return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;

           });
           var status = this.display[0].Status;
           this.error = "";

         } else {


           this.display = [];
           this.error = "No Records Found";
           this.loadingdismiss();
         }
       }, error => {
       alert('Server Error, Data not loaded.')
       console.log("error : "+JSON.stringify(error));

   this.loadingdismiss();
       });
      }
      else{
        this.display = this.display1.filter((data) => {
          if(this.display.length==0){
            this.error = "No data found";
          }
          return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;

        });
      }


  }
  formatDate(value) {
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
  async cancelRequest(leaveData){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to cancel?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "CancelRequest/" + leaveData.ReqRef + "/" + 'L').then(resp=>{
              this.toastmessageService.presentAlert1("","Request Cancelled");
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });
          }
        }
      ]
    });

    await alert.present();
  }
}

