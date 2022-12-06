import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ToastmessageService } from '../../service/toastmessage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReapplypermissionPage } from '../reapplypermission/reapplypermission.page';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-permissionsummary',
  templateUrl: './permissionsummary.page.html',
  styleUrls: ['./permissionsummary.page.scss'],
})
export class PermissionsummaryPage implements OnInit {
  company;
  display: any = [];
  display1: any = [];
  fromDate;
  toDate;
  error;
  empID;
  FUNCTION_ID;
  status;
  disabledvalue;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController, private router: Router, public alertController: AlertController, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService, public loadingController: LoadingController,
  ) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.empID = window.localStorage['EmployeeID'];
    this.FUNCTION_ID = window.localStorage['FUNCTION_ID'];
    this.fromDate = "";
    this.toDate = "";
    this.status = "";
    this.filterDate(undefined, undefined);
    // this.getRequestRef();
  }
  cancel() {
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/permission-request'])
  }

  ngOnInit() {
    this.empID = window.localStorage['EmployeeID'];
  }
  filterDate(fromdate, todate) {
    this.display = [];
    this.presentLoadingWithOptions();
    if (fromdate == undefined || fromdate == "") {

      fromDate = "01-01-1990";
    } else {
      var fromDate = this.formatDate(fromdate);
    }

    if (todate == undefined || todate == "") {
      toDate = "06-06-2079";
    } else {
      var toDate = this.formatDate(todate);
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/searchPermission/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + toDate + "/" + this.status).then((resp: any) => {
      this.loadingdismiss();
      if (resp != "No Records found") {
        //  this.display = JSON.parse(resp.toString());
        this.display = resp;
        //  this.display1=JSON.parse(resp);
        this.display1 = resp;
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
      console.log("error : " + JSON.stringify(error));
      this.loadingdismiss();
    });
  }

  changeOrder() {
    console.log("permission")
    this.error = ''
    this.display = this.display1.filter((data) => {
      if (data.Status != undefined) {
        return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;
      }
    });
    if (this.display.length == 0) {
      // this.error = "No data found";
    }
  }




  // changeOrder() {
  //   this.error = ''
  //   console.log("change status",this.changeOrder);
  //   debugger
  // console.log(Object.values(this.display1).filter(user => this.display1.Status === 1));
  // console.log(Object.values(this.display1).filter((data:any)=> this.display1.Status === 1));
  // this.display = Object.values(this.display1).filter((data: any) => {
  // console.log(data)

  // return data.Status.indexOf(this.status) > -1;
  // console.log(data.Status.indexOf(this.status) != -1);

  // return data.indexOf(this.status) > -1;

  // });

  // if (this.display.length == 0) {
  //   this.error = "No data found";
  // }
  // }
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


  // getRequestRef()
  // {
  //  var odref={
  //    User_ID:this.Userid,
  //    ODRequestRef:this.ReqRef,
  //     userid:window.localStorage['TUM_USER_ID'],
  //     usertoken:window.localStorage['usertoken'],
  //     access_token:window.localStorage['token']
  //    }

  //  this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getODRequestRef/",odref).then(resp=>{
  //    console.log(""+JSON.stringify(resp));
  //    // this.reqRefDetail = JSON.stringify(resp);
  //    this.reqRef1 =  resp[0]['TxnReference'];
  //    console.log(""+this.reqRef1);


  //  }, error => {
  //  // alert('Server Error, Data not loaded.')
  //  console.log("error : "+JSON.stringify(error));

  //  });
  // }

  async openModal(value) {
    // this.traveldetails={
    //  User_ID:this.Userid,
    //  ODRequestRef:this.ReqRef,
    //  TxnReference: this.reqRef1 ,
    //   userid:window.localStorage['TUM_USER_ID'],
    //   usertoken:window.localStorage['usertoken'],
    //   access_token:window.localStorage['token']
    // }
    console.log("" + JSON.stringify(value));
    // this.tempID = "1";
    const modal = await this.modalController.create({
      component: ReapplypermissionPage,
      componentProps: {
        'item': value,
      }


    });
    modal.onDidDismiss()
      .then((data) => {
        this.filterDate(undefined, undefined);
      });

    return await modal.present();

  }
  async cancelRequest(permData) {
    debugger;
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

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CancelRequest/" + permData.ReqRef + "/" + 'P').then(resp => {
              this.toastmessageService.presentAlert1("", "Request Cancelled");
              this.filterDate(undefined, undefined);

            }, error => {

              console.log("error : " + JSON.stringify(error));

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
      duration: 500
    });
    return await loading.present();
  }
  async loadingdismiss() {
    return await this.loadingController.dismiss();
  }
}
