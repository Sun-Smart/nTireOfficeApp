import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { AlertController,LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ReapplycoffPage} from '../../Hrms_pages/reapplycoff/reapplycoff.page';

@Component({
  selector: 'app-coffsummary',
  templateUrl: './coffsummary.page.html',
  styleUrls: ['./coffsummary.page.scss'],
})
export class CoffsummaryPage implements OnInit {
  company;
  empID;
  coffDate;
  workingDate;
  FUNCTION_ID;
  error;
  display=[];
  status;
  display1=[];
  display2=[];
  reqRef1: any;
  ReqRef: any;
  Userid: any;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController,private router: Router,public alertController: AlertController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService,public loadingController: LoadingController,) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.empID=window.localStorage['em_emp_id'];
    this.FUNCTION_ID= window.localStorage['FUNCTION_ID'];
    this.status="";
   this.filterDate(undefined,undefined);


  }

  ngOnInit() {
  }
  changeOrder(){

    if(this.workingDate!=undefined){
      var fromDate = this.formatDate(this.coffDate);
      var todate = this.formatDate(this.workingDate);
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "searchCoff/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + todate).then(resp=>{


      if (resp != "No Records found" && resp != "[]" && resp != "") {

        //this.display = JSON.parse(resp.toString());
        // this.loadingdismiss();
        console.log(""+ JSON.stringify(this.display))
        this.display2 = JSON.parse(resp.toString());
        this.error=''
        this.display = this.display2.filter((data) => {

          return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;

        });

        if(this.display.length==0){
          this.error = "No data found";

      }
        this.ReqRef = this.display[0].ReqRef;
        this.Userid = this.display[0].UserID
        // console.log($scope.display)
        var status = this.display[0].Status;
        this.error = "";
        // this.getRequestRef();
      } else {

        this.error = "No data found";
        // this.loadingdismiss();
      }
      // this.loadingdismiss();
    }, error => {

    console.log("error : "+JSON.stringify(error));
    // this.loadingdismiss();
    });

}
else{
  this.error=''
    this.display = this.display1.filter((data) => {

      return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;

    });

    if(this.display.length==0){
      this.error = "No data found";

  }
}
  }
  filterDate(coffdate,workingdate){

    // this.presentLoadingWithOptions();
    this.display=[];
    if (coffdate == undefined || coffdate == "") {
      fromDate = "01-01-1990";
    } else {
      var fromDate = this.formatDate(coffdate);
    }

    if (workingdate == undefined || workingdate == "") {
      toDate = "06-06-2079";
    } else {
      var toDate = this.formatDate(workingdate);
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "searchCoff/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + toDate).then(resp=>{


      if (resp != "No Records found" && resp != "[]" && resp != "") {

        this.display = JSON.parse(resp.toString());
        // this.loadingdismiss();
        console.log(""+ JSON.stringify(this.display))
        this.display1 = JSON.parse(resp.toString());
        this.ReqRef = this.display[0].ReqRef;
        this.Userid = this.display[0].UserID
        // console.log($scope.display)
        var status = this.display[0].Status;
        this.error = "";
        // this.getRequestRef();
      } else {

        this.error = "No data found";
        // this.loadingdismiss();
      }
      // this.loadingdismiss();
    }, error => {

    console.log("error : "+JSON.stringify(error));
    // this.loadingdismiss();
    });
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
  async cancelRequest(coffData){
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

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "CancelRequest/" + coffData.ReqRef + "/" + 'C').then(resp=>{
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

  async openModal(coffData){
    const modal = await this.modalController.create({
      component: ReapplycoffPage,
      componentProps: {
        'item':coffData,
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.filterDate(undefined,undefined);
  });
    return await modal.present();
  }
}
