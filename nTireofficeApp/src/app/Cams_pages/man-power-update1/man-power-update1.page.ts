import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import { NavParams } from '@ionic/angular';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-man-power-update1',
  templateUrl: './man-power-update1.page.html',
  styleUrls: ['./man-power-update1.page.scss'],
})
export class ManPowerUpdate1Page implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  manpowerskill:any;
  manpowerrefdetail:any;
  nomhours:any;
  nomhoursm:any;
  hhmm:any;
  empref:any;
  skill:any;
  sub:any;
  data:any;
  manpowerrefdetailu;
  skillid;
  emprefid;
  rowuniqid;
  assetpmref;
  assetid;
  assetactivityid;

  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private model:ModalController,navParams: NavParams) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.data=navParams.get('item');
    console.log(this.data);
    this.getManpowerskill();
    this.getEmpre();
   }

  ngOnInit() {

    
    // this.sub = this.activatedRoute.params.subscribe(params => {  
    //   this.data = params;   
    //   // this.assetid = params['assetid'];
    //   // this.assetactivityid= params['assetactivityid'];
    //   // this.assetpmref=params['assetpmref'];
    // });  
    // this.getManpowerskill();
    // this.getEmpre();
    
  }
  getEmpre(){

    this.skill=this.data.TYPE_ID;
    console.log(this.skill);
    var arr=this.data.actual_hrs.split(':');
    this.nomhours= $.trim(arr[0]);
    this.nomhoursm= $.trim(arr[1]);
    this.skillid=this.data.TYPE_ID;
    this.emprefid=this.data.VAL;
    this.rowuniqid=this.data.rowuniqueid;
    var datae = {
      'branchid': this.branchID,
      'functionid':this.functionID,
      'usertype':this.usertype,
      'access_token':this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(datae);
    const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpowerrefdtlu',datae, {
      headers: options,
    }).subscribe(resp => {
      this.manpowerrefdetailu = resp;
      console.log(resp);
      this.empref=resp[0].tum_user_id;
      console.log(this.empref);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
  
    }); 

  }

  getManpowerskill(){
    var data = {
      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpoweskilldtl',data, {
      headers: options,
    }).subscribe(resp => {
      this.manpowerskill = resp;
      console.log(this.manpowerskill);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
  
    });  
}

manskilludfvdfv(val){
  var datae = {
     
      
    'branchid': this.branchID,
    'functionid':this.functionID,
    'usertype':val,
    'access_token':this.accessToken,
    'userid':this.userID,
    'usertoken':this.userToken
  }

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpowerrefdtl',datae, {
    headers: options,
  }).subscribe(resp => {
    this.manpowerrefdetailu = resp;
    console.log(this.manpowerrefdetailu);
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });  
}


manpowerupdate(){
 // var nomhrs=this.datePipe.transform(this.nomhours, "HH:mm:ss");


var nomhrs=this.nomhours;
  console.log(nomhrs);
  var nommin=this.nomhoursm;
  console.log(nommin);
  if(nomhrs > 16 ){
    // alert("Number Of Hours(HH:MM) is not in proper format")
    this.presentAlert("Alert","Number Of Hours(HH:MM) is not in proper format");
  }else{
    if(nommin > 60){
    // alert("Number Of Hours(HH:MM) is not in proper format")
    this.presentAlert("Alert","Number Of Hours(HH:MM) is not in proper format")
  
  }else{

    this.hhmm=nomhrs+':'+nommin;
      console.log(this.hhmm);


      //var manref=this.empref.split('-');

      var dataemu = {
        'branchid': window.localStorage['TUM_BRANCH_ID'],
        'functionid':window.localStorage['FUNCTION_ID'],
        'userskill':this.skill,
        'assetid':this.data.assetid,
        'assetactivityid':this.data.assetactivityid,
        'assetpmref':this.data.assetpmref,
        'assetempid':this.empref,
        'assethrs':this.hhmm,
        'access_token':this.accessToken,
        'userid':this.userID,
        'usertoken':this.userToken,
        'skillidu':this.skillid,
        'refidu':this.emprefid,
        'uniqid':this.rowuniqid,
      }
      console.log(dataemu);
      const header = new Headers();
      header.append("Content-Type", "application/json");
    
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpowerupdateapp',dataemu, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        this.presentAlert('Alert','Updated Successfully');
        this.hhmm='';
        this.skill='';
        this.nomhours='';
        this.nomhoursm='';
        this.closemodel();
      }, error => {
        //this.presentAlert('Alert','Server Error,Contact not loaded');
        console.log("error : " + JSON.stringify(error));
    
      });  
  }
}
}

async presentAlert(heading, tittle) {
  var alert = await this.alertController.create({
    header: heading,

    message: tittle,
    buttons: ['OK']
  });

  await alert.present();
}


closemodel(){
     
  this.model.dismiss();
}
}




