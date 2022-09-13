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
  selector: 'app-consumable-update',
  templateUrl: './consumable-update.page.html',
  styleUrls: ['./consumable-update.page.scss'],
})
export class ConsumableUpdatePage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  data;
  materialcode;
  materialdescp;
  quantity;
  replaceqty;
  returnqty;
  scrapqty;
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
    this.getdata();
  }


  ngOnInit() {
  }

  getdata(){
    this.materialcode=this.data.spare_code;
    this.materialdescp=this.data.itemdesc;
    this.quantity=this.data.asm_spare_qty;
    this.replaceqty=this.data.mss_replaced_qty;
    this.returnqty=this.data.mss_returned_qty;
    this.scrapqty=this.data.mss_scrap_qty;
    this.cost=this.data.SPARECOST;
  }
  closemodel(){
     
    this.model.dismiss();
  }

  updateconsumable(){

    var dataemu = {
       
        
      'branchid': this.branchID,
      'functionid': this.functionID,
      //'slno':$scope.spares.sno,
      'assetid':this.data.assetid,
      'assetactivityid':this.data.assetactivityid,
      'assetpmref':this.data.assetpmref,
      'itemcode':this.data.spare_code,
      'plannedqty':this.data.asm_spare_qty,
      'replaceqty':this.replaceqty,
      'returnqty':this.returnqty,
      'scrapqty':this.scrapqty,
      'rowuniqid':this.data.mmp_rowuniqueid1,
      //'spareqty':$scope.spares.quantity,
      
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataemu);
    const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/consumableupdateapp',dataemu, {
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
  
      message: tittle,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
