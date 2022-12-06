import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ToastmessageService } from '../../service/toastmessage.service';
import { ModalController } from '@ionic/angular';
import { ReapplyassetPage } from '../reapplyasset/reapplyasset.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-assetssummary',
  templateUrl: './assetssummary.page.html',
  styleUrls: ['./assetssummary.page.scss'],
})

export class AssetssummaryPage implements OnInit {
  showfilter: boolean = false;
  categoryData: any = [];
  subCategoryData: any = [];
  FUNCTION_ID;
  assestCategory;
  assestsubCategory;
  status;
  display: any = [];
  fromDate;
  toDate;
  display1: any = [];
  error;
  empID;
  company;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController, private router: Router, public alertController: AlertController, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.FUNCTION_ID = window.localStorage['FUNCTION_ID'];
    this.empID = window.localStorage['EmployeeID'];
    this.assestCategory = "";
    this.assestsubCategory = "";
    this.status = "";

  }
  ngOnInit() {
    debugger
    this.getAssetCategory();
    this.filterAsset("");
  }

  cancel() {
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/assetrequest'])
  }
  //get asset category
  //  getAssetCategory(){
  //   this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "/LoadAssetCategory/"+this.FUNCTION_ID+ "" + Value).then(resp=>{
  //     this.categoryData = JSON.parse(resp.toString());
  //    }, error => {
  //    console.log("error : "+JSON.stringify(error));
  //    });
  // }


  getAssetCategory() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/LoadAssetCategory").then(resp => {
      this.categoryData = resp;

      console.log(this.categoryData)
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }

  //get assests sub category
  getAssestsSubcat() {
    debugger
    this.subCategoryData = [];
    this.assestsubCategory = "";
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/LoadAssetSubCategory/" + this.FUNCTION_ID + "/" + this.assestCategory).then(resp => {
      this.subCategoryData = resp;
      console.log(resp)
    }, error => {

      console.log("error : " + JSON.stringify(error));
    });
  }

  filterAsset(data) {
    this.display = [];
    debugger
    if (data == 'subcat') {
      this.getAssestsSubcat();
    }
    debugger
    if (this.fromDate == undefined || this.fromDate == "") {
      fromDate = "01-01-1990";
    } else {
      var fromDate = this.formatDate(this.fromDate);
    }
    if (this.toDate == undefined || this.toDate == "") {
      toDate = "06-06-2079";
    } else {
      var toDate = this.formatDate(this.toDate);
    }
    if (this.assestCategory == "") {
      this.assestCategory = "0";
    }
    if (this.assestsubCategory == "") {
      this.assestsubCategory = "0";
    }
    debugger
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/SearchAssets/" + this.empID + "/" + fromDate + "/" + toDate + "/" + this.assestCategory + "/" + this.assestsubCategory).then(resp => {
      console.log(resp)
      var res = resp;
      console.log(res)
      if (res == "No data found") {
        debugger
        this.display = [];
        this.error = "No Records Found";
      } else {
        debugger
        this.display = res;
        this.display1 = res;
        // console.log($scope.display)
        var status = this.display[0].Status;
        this.error = "";

      }
    }
      //  , error => {
      //  alert('Server Error, Data not loaded.')
      //  console.log("error : "+JSON.stringify(error));

      //  }

    );
  }
  changeOrder() {
    this.error = ''
    this.display = this.display1.filter((data) => {
      return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;
    });
    if (this.display.length == 0) {
      this.error = "No data found";
    }
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }

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
      component: ReapplyassetPage,
      componentProps: {
        'item': value,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.filterAsset(undefined);
      });
    return await modal.present();
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
  async cancelRequest(permData) {
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

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "CancelRequest/" + permData.ReqRef + "/" + 'A').then(resp => {
              this.toastmessageService.presentAlert1("", "Request Cancelled");
            }, error => {

              console.log("error : " + JSON.stringify(error));

            });
          }
        }
      ]
    });
    await alert.present();
  }
}
