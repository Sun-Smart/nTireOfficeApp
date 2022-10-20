import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {TabparamserviceService} from '../../service/tabparamservice.service'
import { ActivatedRoute} from '@angular/router';
import {SpareUsedUpdatePage} from '../spare-used-update/spare-used-update.page'

@Component({
  selector: 'app-spares-used',
  templateUrl: './spares-used.page.html',
  styleUrls: ['./spares-used.page.scss'],
})
export class sparesUsedPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  urldata;
  doi1;
  assetcodetabrefe:any;
  sparematerialddtl:any;
  materialdescp:any;
  itemcodein:any;
  doi:any;
  sno:any;
  quantity:any;
  consumecountcheck:any;
  sparerecord:any;
  materialcode:any;
  rowuniqids:any;

  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private Tabparams:TabparamserviceService,public modalController: ModalController) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.materialcode="<< Select >>";
    console.log(JSON.stringify(this.Tabparams.data));
    this.urldata = JSON.parse(JSON.stringify(this.Tabparams.data));
    this.assetcodetabrefe=this.urldata.pmm_asset_code;

    //this.doi=this.datePipe.transform(new Date, 'MM/DD/YYYY');
    var today = new Date();
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "/" + day + "/" + year;
    this.doi = finaltodayDate;
    console.log(this.doi);
    //console.log(this.doi)
  }

  ngOnInit() {
    this.getItem();
    this.sparealldata();
  }

  getItem(){
    var dataes = {
      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareitemdtl',dataes, {
      headers: options,
    }).subscribe(resp => {
      this.sparematerialddtl =JSON.stringify(resp) ;
      this.sparematerialddtl=JSON.parse(this.sparematerialddtl);
      this.sparematerialddtl=JSON.parse(this.sparematerialddtl);
      this.sparematerialddtl=this.sparematerialddtl

      console.log(this.sparematerialddtl);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  matrialdtle(mat){

    var dataesp = {
      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'itemid':parseInt(mat),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }

    console.log(dataesp);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareitemdtlval',dataesp, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.materialdescp = resp[0].ITEM_DESCRIPTION;
      this.itemcodein=resp[0].ITEM_CODE;
      console.log(this.materialdescp);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }


  insertspare(){

    var instdte=this.datePipe.transform(this.doi, 'yyyy-MM-dd');
    var dataem = {
    'branchid': this.branchID,
    'functionid':parseInt(this.functionID),
    'slno':this.sno,
    'assetid':parseInt(this.urldata.CMD_ASSET_ID),
    'assetactivityid':parseInt(this.urldata.CMD_ACTIVITY_ID),
    'assetpmref':parseInt(this.urldata.pmr_reference),
    'itemcode':parseInt(this.itemcodein),
    'spareqty':parseInt(this.quantity),
    //'spareqty':$scope.spares.quantity,
    'instdte':instdte,
    'access_token':this.accessToken,
    'userid':this.userID,
    'usertoken':this.userToken
  }
  console.log(dataem);

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareinsertapp',dataem, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)
    this.consumecountcheck=resp;

    if(this.consumecountcheck !='consume'){
    // alert("inserted Successfully");
    this.presentAlert("Success", "inserted Successfully");
   this.sparerecord = resp;
    console.log(this.sparerecord);
    this.sno='';
    this.materialcode='';
    this.materialdescp='';
    this.quantity='';
   // $scope.spares.doi='';


}else{
// alert("Already added a consumables");
this.presentAlert("Alert", "Already added a consumables");

}

  }, error => {
    this.presentAlert("Alert", "Already added a consumables");
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

 async deleteItems(data , i){
    this.rowuniqids=data.rowuniqueid;
      const alert = await this.alertController.create({
    header: 'Delete!',
    message: 'Are yoy sure want to delete',
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
          var datamdd = {
            'branchid': window.localStorage['TUM_BRANCH_ID'],
           'functionid':window.localStorage['FUNCTION_ID'],
           'assetid':this.urldata.CMD_ASSET_ID,
           'assetactivityid':this.urldata.CMD_ACTIVITY_ID,
           'assetpmref':this.urldata.pmr_reference,
           'itemcode':this.materialcode,
           'uniqueid':this.rowuniqids,
           'access_token':window.localStorage['token'],
           'userid':this.userID,
           'usertoken':this.userToken

        };

         const header = new Headers();
         header.append("Content-Type", "application/json");

         let options = new HttpHeaders().set('Content-Type', 'application/json');
         this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/sparedelete',datamdd, {
           headers: options,
         }).subscribe(resp => {
          this.presentAlert("Delete","Deleted Successfully");
          this.sparerecord = resp;
        console.log(resp);
         }, error => {
           //this.presentAlert('Alert','Server Error,Contact not loaded');
           console.log("error : " + JSON.stringify(error));

         });
        }
      }
    ]
  });

  await alert.present();
  }

  sparealldata(){

    var dataea = {
      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'assetid':parseInt(this.urldata.CMD_ASSET_ID),
      'assetactivityid':parseInt(this.urldata.CMD_ACTIVITY_ID),
      'assetpmref':parseInt(this.urldata.pmr_reference),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataea);
    const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/sparealldatadetail',dataea, {
    headers: options,
  }).subscribe(resp => {
         this.sparerecord = resp;
          console.log(resp);
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
  }

  async editItems(data, index) {

    console.log(data);
    console.log(index)
  data.assetid=this.urldata.CMD_ASSET_ID;
  data.assetactivityid = this.urldata.CMD_ACTIVITY_ID;
  data.assetpmref = this.urldata.pmr_reference;
  this.doi1=data.CAMS_ASSET_INSTALLATION_DATE.split('/');
  console.log(this.doi1);
  data.doi=new Date(this.doi1[2]+'/'+this.doi1[1]+'/'+this.doi1[0]);
    const modal = await this.modalController.create({
      component: SpareUsedUpdatePage,
      componentProps: {
        'item': data,
      }

    });
    modal.onDidDismiss()
      .then((resp) => {
        this.sparealldata();
      //  console.log(barval)
      //  this.callforalldetails(barval);
      });

    return await modal.present();


  }
}
