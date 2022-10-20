import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import {TabparamserviceService} from '../../service/tabparamservice.service'
import { ActivatedRoute} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ManPowerUpdatePage} from '../man-power-update/man-power-update.page'

@Component({
  selector: 'app-manpower-used',
  templateUrl: './manpower-used.page.html',
  styleUrls: ['./manpower-used.page.scss'],
})
export class ManpowerUsedPage implements OnInit {

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
  manpowerskill:any;
  manpowerrefdetail:any;
  nomhours:any;
  nomhoursm:any;
  hhmm:any;
  empref:any;
  skill:any;
  manpowerrecord:any;
  rowuniqid:any;

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

    this.skill="<< Select >>"
    this.empref="<< Select >>"
  }

  ngOnInit() {
    this.getManpowerskill();
    this.manskill();
    this.manpoweralldata();
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

  manskill(){
    var datae = {


      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'usertype':this.usertype,
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
      this.manpowerrefdetail = resp;
      console.log(this.manpowerrefdetail);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  manpowerinsert(){

    //var nomhrs=this.datePipe.transform(this.nomhours, 'HH:mm:ss');;
    var empref = this.empref;
    console.log(empref);
    var nomhrs=this.nomhours;
    console.log(nomhrs);
    var nommin=this.nomhoursm;
    console.log(nommin);
    if(nomhrs > 16 ){
      this.presentAlert("Alert","Number Of Hours(HH:MM) is not in proper format");
    }else{
       if(nommin > 60){
      // alert("Number Of Hours(HH:MM) is not in proper format")
      this.presentAlert("Alert","Number Of Hours(HH:MM) is not in proper format");
    }else{

      this.hhmm=nomhrs+':'+nommin;
        console.log(this.hhmm);
//var manref=this.empref.split('-');

//console.log(manref);

var dataem = {


  'branchid': this.branchID,
  'functionid':parseInt(this.functionID),
  'userskill':parseInt(this.skill),
  'assetid':parseInt(this.urldata.CMD_ASSET_ID),
  'assetactivityid':parseInt(this.urldata.CMD_ACTIVITY_ID),
  'assetpmref':parseInt(this.urldata.pmr_reference),
  'assetempid':parseInt(empref),
  'assethrs':this.hhmm,
  'access_token':this.accessToken,
  'userid':this.userID,
  'usertoken':this.userToken
}
console.log(dataem);
const header = new Headers();
header.append("Content-Type", "application/json");

let options = new HttpHeaders().set('Content-Type', 'application/json');
this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpowerinsertapp',dataem, {
  headers: options,
}).subscribe(resp => {
  var costchk=resp;
        if(costchk!='nocost'){

          this.presentAlert("Success","Inserted Successfully");
       this.manpowerrecord = resp;
        console.log(resp);
          this.hhmm='';
          this.skill='';
          this.nomhours='';
          this.nomhoursm='';
          this.empref='';

}else{
  this.presentAlert("Alert","Please configure the cost");
}
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
      cssClass: 'Cssbutton',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }


 async deleteItem(data, index){

  this.rowuniqid=data.rowuniqueid;
  console.log(this.rowuniqid)
  if(this.empref == '<< Select >>'){
    var empref = '';
  }else{
    empref = this.empref;
  }
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
          var datamdd = {
            'branchid': window.localStorage['TUM_BRANCH_ID'],
            'functionid':window.localStorage['FUNCTION_ID'],
            'assetid':this.urldata.CMD_ASSET_ID,
            'assetactivityid':this.urldata.CMD_ACTIVITY_ID,
            'assetpmref':this.urldata.pmr_reference,
            'assetempid':empref,
            'access_token':this.accessToken,
            'userid':this.userID,
            'usertoken':this.userToken,
            'uniqid':this.rowuniqid,

         };
         console.log(datamdd);
         const header = new Headers();
         header.append("Content-Type", "application/json");

         let options = new HttpHeaders().set('Content-Type', 'application/json');
         this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpowerdelete',datamdd, {
           headers: options,
         }).subscribe(resp => {
          this.presentAlert("Delete","Deleted Successfully");
          this.manpowerrecord = resp;
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

manpoweralldata(){

  var dataea = {
    'branchid': this.branchID,
    'functionid':parseInt(window.localStorage['FUNCTION_ID']),
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
this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/manpoweralldatadetail',dataea, {
  headers: options,
}).subscribe(resp => {
       this.manpowerrecord = resp;
        console.log(resp);
}, error => {
  //this.presentAlert('Alert','Server Error,Contact not loaded');
  console.log("error : " + JSON.stringify(error));

});
}

// editItem(data, index){

//   console.log(data);
//   console.log(index)
// data.assetid=this.urldata.CMD_ASSET_ID;
// data.assetactivityid = this.urldata.CMD_ACTIVITY_ID;
// data.assetpmref = this.urldata.pmr_reference;
//   this.router.navigate(['/man-power-update',data]);

// }

async editItem(data, index) {
  debugger;
  console.log(data);
  console.log(index)
data.assetid=this.urldata.CMD_ASSET_ID;
data.assetactivityid = this.urldata.CMD_ACTIVITY_ID;
data.assetpmref = this.urldata.pmr_reference;

  const modal = await this.modalController.create({
    component: ManPowerUpdatePage,
    componentProps: {
      'item': data,
    }

  });
  modal.onDidDismiss()
    .then((resp) => {
      this.manpoweralldata();
    //  console.log(barval)
    //  this.callforalldetails(barval);
    });

  return await modal.present();


}
}
