import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { ModalController } from '@ionic/angular';
import {ReapplyassetPage} from '../reapplyasset/reapplyasset.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-assetssummary',
  templateUrl: './assetssummary.page.html',
  styleUrls: ['./assetssummary.page.scss'],
})
export class AssetssummaryPage implements OnInit {
  categoryData=[];
  subCategoryData=[];
  FUNCTION_ID;
  assestCategory;
  assestsubCategory;
  status;
  display=[];
  fromDate;
  toDate;
  display1=[];
  error;
  empID;
  company;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController,public alertController: AlertController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.empID=window.localStorage['em_emp_id'];
    this.assestCategory="";
    this.assestsubCategory="";
    this.status="";
    this.filterAsset(undefined);
    this.getAssetCategory();

  }
  ngOnInit() {
  }
 //get asset category
 getAssetCategory(){
  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "LoadAssetCategory/"+this.FUNCTION_ID+ "").then(resp=>{
    this.categoryData = JSON.parse(resp.toString());
   }, error => {

   console.log("error : "+JSON.stringify(error));

   });
}
//get assests sub category
getAssestsSubcat(){
  this.subCategoryData=[];
  this.assestsubCategory="";
  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "LoadAssetSubCategory/"+this.FUNCTION_ID +"/"+ this.assestCategory).then(resp=>{
    this.subCategoryData = JSON.parse(resp.toString());
   }, error => {

   console.log("error : "+JSON.stringify(error));
   });
}
filterAsset(data){
  this.display=[];
if(data=='subcat'){
this.getAssestsSubcat();
}
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
   this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "SearchAssets/" + this.empID + "/" + fromDate + "/" + toDate + "/" + this.assestCategory + "/" +this.assestsubCategory).then(resp=>{
     if (resp != "No Records found") {
       this.display = JSON.parse(resp.toString());
       this.display1=JSON.parse(resp.toString());
       // console.log($scope.display)
       var status = this.display[0].Status;
       this.error = "";
     } else {
       this.display = [];
       this.error = "No Records Found";
     }
   }, error => {
   alert('Server Error, Data not loaded.')
   console.log("error : "+JSON.stringify(error));

   });
 }
 changeOrder(){
  this.error=''
  this.display = this.display1.filter((data) => {

    return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;

  });
  if(this.display.length==0){
    this.error = "No data found";
  }
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
   component: ReapplyassetPage,
   componentProps: {
     'item':value,
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
async cancelRequest(permData){
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

          this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "CancelRequest/" + permData.ReqRef + "/" + 'A').then(resp=>{
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
