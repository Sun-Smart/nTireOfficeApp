import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import { NavParams } from '@ionic/angular';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-spare-used-update',
  templateUrl: './spare-used-update.page.html',
  styleUrls: ['./spare-used-update.page.scss'],
})
export class SpareUsedUpdatePage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  spareCost:any;
  data;

  materialdescp;
  itemcodein;
  sparematerialddtl;
  sno;
  materialcode;
  quantity;
  doi;
  cost;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private model:ModalController,navParams: NavParams) {
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.data=navParams.get('item');
    console.log(this.data);
    this.materialcode = this.data.MaterialCode;
    this.getItem();
  }

  ngOnInit() {
  }

  closemodel(){

    this.model.dismiss();
  }

  getItem(){
    this.sno=this.data.serialno;
    this.materialdescp= this.data.MaterialDescription;
    this.quantity=this.data.sparequantity;
    this.doi= this.data.doi;
    this.cost = this.data.SPARECOST;
    var dataes = {
      'branchid': this.branchID,
      'functionid':this.functionID,
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
      this.sparematerialddtl = resp;
      console.log(this.sparematerialddtl);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  matrialdtle(mat){

    var dataesp = {
      'branchid': this.branchID,
      'functionid':this.functionID,
      'itemid':mat,
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

  spareCostvalidate(qty){
    this.cost= qty * this.data.SPARECOST
  }


  updatespare(){
    var instdte=this.datePipe.transform(this.doi, 'yyyy-MM-dd');
    console.log(instdte);

    this.spareCost= this.quantity * this.data.SPARECOST;
    var dataem = {
      'branchid': this.branchID,
      'functionid':this.functionID,
      'slno':this.sno,
      'assetid':this.data.assetid,
      'assetactivityid':this.data.assetactivityid,
      'assetpmref':this.data.assetpmref,
      'itemcode':this.materialcode,
      'spareqty':this.quantity,
      'cost':this.spareCost,
      //'spareqty':$scope.spares.quantity,
      'instdte':instdte,
      'uniqueid':this.data.rowuniqueid,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken


    }
    console.log(dataem);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/spareupdateapp',dataem, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.presentAlert('Alert','Updated Successfully');
      this.closemodel();
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
}
