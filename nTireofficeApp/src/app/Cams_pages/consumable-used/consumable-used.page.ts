import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {TabparamserviceService} from '../../service/tabparamservice.service'
import { ActivatedRoute} from '@angular/router';
import {ConsumableUpdatePage} from '../consumable-update/consumable-update.page'

@Component({
  selector: 'app-consumable-used',
  templateUrl: './consumable-used.page.html',
  styleUrls: ['./consumable-used.page.scss'],
})
export class ConsumableUsedPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  urldata;
  assetcodetabrefe:any;
  consumablematerialddtl:any;
  materialdescp:any;
  itemcodein:any;
  quantity:any;
  replaceqty:any;
  returnqty:any;
  scrapqty:any;
  consumecountcheck:any;
  consumerecord:any;
  materialcode:any;
  rowuniqidsc:any;
  mtrcode: any;
  matcode: any;

  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private Tabparams:TabparamserviceService,public modalController: ModalController) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');

    console.log(JSON.stringify(this.Tabparams.data));
    this.urldata = JSON.parse(JSON.stringify(this.Tabparams.data));
    this.assetcodetabrefe=this.urldata.pmm_asset_code;
    this.materialcode="<< Select >>"

  }

  ngOnInit() {
    this.getconsumableMaterial();
    this.consumealldata();
  }

  getconsumableMaterial(){
    var dataesc = {


      'branchid': this.branchID,
      'functionid': parseInt(this.functionID),
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareitemdtl',dataesc, {
      headers: options,
    }).subscribe(resp => {
      this.consumablematerialddtl = resp;
      console.log(this.consumablematerialddtl);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  matrialdtleconsume(matc){
    debugger;
    this.mtrcode=matc.split("-")
    console.log(this.mtrcode);
    this.matcode=this.mtrcode[0]

    var dataespc = {


      'branchid': this.branchID,
      'functionid': parseInt(this.functionID),
      'itemid': this.matcode,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareitemdtlval',dataespc, {
      headers: options,
    }).subscribe(resp => {
      debugger;
      this.materialdescp = resp[0].ITEM_DESCRIPTION;
      this.itemcodein=resp[0].ITEM_CODE;
        console.log(this.materialdescp);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  insertconsumable(){
    var dataem = {

      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      //'slno':$scope.spares.sno,
      'assetid':parseInt(this.urldata.CMD_ASSET_ID),
      'assetactivityid':parseInt(this.urldata.CMD_ACTIVITY_ID),
      'assetpmref':parseInt(this.urldata.pmr_reference),
      'itemcode':this.itemcodein,
      'plannedqty':parseInt(this.quantity),
      'replaceqty':parseInt(this.replaceqty),
      'returnqty':parseInt(this.returnqty),
      'scrapqty':parseInt(this.scrapqty),
      //'spareqty':$scope.spares.quantity,

      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataem);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/consumableinsertapp',dataem, {
      headers: options,
    }).subscribe(resp => {
      this.consumecountcheck=resp;

        if(this.consumecountcheck!='spare'){
        // alert("inserted Successfully");

          this.presentAlert("Sucess","inserted Successfully");
       this.consumerecord = resp;
        console.log(this.consumerecord);

        this.materialcode='';
        this.materialdescp='';
        this.quantity='';
        this.replaceqty='';
        this.returnqty='';
        this.scrapqty='';
}else{
  this.presentAlert('Alert','Already added a spare');
   // alert("Already added a spare");
}
    }, error => {
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

  async deleteItemconsume(data, i){
    this.rowuniqidsc=data.mmp_rowuniqueid1;

    const alert = await this.alertController.create({
      header: 'Delete!',
      message: 'Are yoy sure want to delete',
      backdropDismiss:false,
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
            var datamddc = {
              'branchid': this.branchID,
                'functionid':this.functionID,
                //'slno':$scope.spares.sno,
                'assetid':this.urldata.CMD_ASSET_ID,
                'assetactivityid':this.urldata.CMD_ACTIVITY_ID,
                'assetpmref':this.urldata.pmr_reference,
                'rowuniqid':this.rowuniqidsc,
                'access_token':this.accessToken,
                'userid':this.userID,
                'usertoken':this.userToken

             };

           const header = new Headers();
           header.append("Content-Type", "application/json");

           let options = new HttpHeaders().set('Content-Type', 'application/json');
           this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/sparedelete',datamddc, {
             headers: options,
           }).subscribe(resp => {
            this.presentAlert("Delete","Deleted Successfully");
            this.consumerecord = resp;
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

  consumealldata(){

    var dataeasc = {

      'branchid': parseInt(this.urldata.TUM_BRANCH_ID),
      // 'branchid': localStorage.getItem('TUM_BRANCH_ID'),
      'functionid':parseInt( this.functionID),
      'assetid':parseInt(this.urldata.CMD_ASSET_ID),
      'assetactivityid':parseInt(this.urldata.CMD_ACTIVITY_ID),
      'assetpmref':parseInt(this.urldata.pmr_reference),

      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataeasc);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/consumealldatadetail',dataeasc, {
      headers: options,
    }).subscribe(resp => {
      this.consumerecord = resp;
        console.log(this.consumerecord);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  async editItemsc(data, index) {

    console.log(data);
    console.log(index)
  data.assetid=this.urldata.CMD_ASSET_ID;
  data.assetactivityid = this.urldata.CMD_ACTIVITY_ID;
  data.assetpmref = this.urldata.pmr_reference;
    const modal = await this.modalController.create({
      component: ConsumableUpdatePage,
      componentProps: {
        'item': data,
      }

    });
    modal.onDidDismiss()
      .then((resp) => {
        this.consumealldata();
      //  console.log(barval)
      //  this.callforalldetails(barval);
      });

    return await modal.present();


  }
}
