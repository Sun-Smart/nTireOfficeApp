import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-asset-reconcil',
  templateUrl: './asset-reconcil.page.html',
  styleUrls: ['./asset-reconcil.page.scss'],
})
export class AssetReconcilPage implements OnInit {

  cotenthide:boolean;
  userID:any;
  username:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  assetcode1;
  isItemAvailable:boolean;
  assetcode1str:any;
  assetcodeResult:any;
  assetCode:any;
  scannedCode:any;
  detailsrecon:any;
  detailsrecon1=[];
  deprciationtyper:any;
  myValuerecon:any;
  assttrecon:any;
  asscode:any;
  descp:any;
  department:any;
  detailsreq:any;
  assetidrecon:any;
  depid:any;
  assetuser:any;
  newasset: any;

  constructor(private datePipe: DatePipe,private barcodeScanner: BarcodeScanner, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router: Router) {
//private qrScanner: QRScanner
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');
   this.cotenthide=true;
   }

  ngOnInit() {

  }
  doRefresh(event){
    this.detailsrecon1=[];
    this.assetCode='';
  event.target.complete();
  }

  getItems(ev: any) {
    this.assetcode1 = [];
    this.newasset = ev.target.value;
    console.log(this.newasset);
    if (ev.target.value == "") {
      this.assetcode1 = [];
      this.isItemAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      "assetcode" :this.newasset,
    };
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetcodelist',params, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.assetcodeResult= resp;
      this.assetcode1str = this.assetcodeResult;

      for (var i = 0; i < this.assetcode1str.length; i++) {

        this.assetcode1.push(this.assetcode1str[i].ASSET_CODE);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.assetcode1 = this.assetcode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  adddata(item) {

    this.assetCode = item;
    this.isItemAvailable = false;
  }

  // scancoderecon(){
  //   console.log('scan');

  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        console.log(status);
  //        // camera permission was granted
  //        this.cotenthide=false;
  //        this.qrScanner.show();
  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCode=text;
  //           this.fetchreconcilation(this.scannedCode)
  //          this.qrScanner.hide(); // hide camera preview
  //          this.cotenthide=true;
  //          scanSub.unsubscribe(); // stop scanning
  //        });

  //      } else if (status.denied) {
  //        // camera permission was permanently denied
  //        // you must use QRScanner.openSettings() method to guide the user to the settings page
  //        // then they can grant the permission from there
  //      } else {
  //        // permission was denied, but not permanently. You can ask for permission again at a later time.
  //      }
  //   })
  //   .catch((e: any) => console.log('Error is', e));
  // }

  scancoderecon(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode=barcodeData.text;
      this.fetchreconcilation(this.scannedCode)
      }).catch(err => {
      console.log('Error', err);
      });
  }

  fetchreconcilation(assetcode){
    this.detailsrecon1=[];
    console.log(assetcode);
    this.assetCode = assetcode;
    this.isItemAvailable = false;
    var data = {
      'assetcodeu': assetcode,
      'branchidu': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/reconassetdetail',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.detailsrecon= resp;
      console.log(this.detailsrecon.length);
        if(this.detailsrecon.length != 0){
      var depritype = this.detailsrecon[0].ASSET_DEPRECIATION_TYPE;
      console.log(depritype);
      if (depritype == 1) {
        this.deprciationtyper = 'Straight Line';
        console.log(this.deprciationtyper);
      } else {
        this.deprciationtyper = 'WDC';
        console.log(this.deprciationtyper);
      }
      var altrecrr = this.detailsrecon;
      if (this.detailsrecon.length < 1) {
        this.myValuerecon = false;
      } else {
        this.detailsrecon1.push(resp[0]);
        this.myValuerecon = true;
      }
    }else{
      this.presentAlert('Alert','No Data Found');
     }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });


    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreq',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.assttrecon = resp;
      var altrec = this.assttrecon;
      console.log(altrec);
      if (altrec.length < 1) {
        this.myValuerecon = false;
        this.asscode = '';
        this.descp = '';
        this.department = '';
      //  this.presentAlert('Alert','No Data Found');
      } else {
        this.detailsreq = resp;
        // $scope.reconcilenew.descp = response.data[0].ASSET_DESCRIPTION;
        // $scope.reconcilenew.asscode = response.data[0].ASSET_CODE;
        this.assetidrecon = resp[0].ASSET_ID;
        this.depid = resp[0].dpid;
        this.assetuser = resp[0].ASSET_USER;
        this.department = resp[0].Text;
        //         //$scope.detailsdept = response.data.recordsets[1];
        console.log(this.department);
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass:'Cssbutton',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  fetchassetrecon(assetcode){
    this.detailsrecon1=[];
    console.log(assetcode);
    this.assetCode = assetcode;
    this.isItemAvailable = false;
    if (assetcode != '') {
      var data = {
        'assetcodeu': this.assetCode,
        'branchidu': this.branchID,
        'access_token':this.accessToken,
        'userid': this.userID,
        'usertoken': this.userToken
      }

      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/reconassetdetail',data, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        //this.detailsrecon= resp[0];
        this.detailsrecon=resp
        console.log(this.detailsrecon.length);
        if(this.detailsrecon.length != 0){
        var depritype = this.detailsrecon[0].ASSET_DEPRECIATION_TYPE;
        console.log(depritype);
        if (depritype == 1) {
          this.deprciationtyper = 'Straight Line';
          console.log(this.deprciationtyper);
        } else {
          this.deprciationtyper = 'WDC';
          console.log(this.deprciationtyper);
        }
        var altrecrr = this.detailsrecon;
        if (this.detailsrecon.length < 1) {
          this.myValuerecon = false;
        } else {
          this.detailsrecon1.push(resp[0]);

          this.myValuerecon = true;
        }
       }else{
        this.presentAlert('Alert','No Data Found');
       }
      }, error => {
        //this.presentAlert('Alert','Server Error,Contact not loaded');
        console.log("error : " + JSON.stringify(error));

      });


      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreq',data, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        this.assttrecon = resp;
        var altrec = this.assttrecon;
        console.log(altrec);
        if (altrec.length < 1) {
          this.myValuerecon = false;
          this.asscode = '';
          this.descp = '';
          this.department = '';
          //this.presentAlert('Alert','No Data Found');
        } else {
          this.detailsreq = resp;
          // $scope.reconcilenew.descp = response.data[0].ASSET_DESCRIPTION;
          // $scope.reconcilenew.asscode = response.data[0].ASSET_CODE;
          this.assetidrecon = resp[0].ASSET_ID;
          this.depid = resp[0].dpid;
          this.assetuser = resp[0].ASSET_USER;
          this.department = resp[0].Text;
          //         //$scope.detailsdept = response.data.recordsets[1];
          console.log(this.department);
        }
      }, error => {
        console.log("error : " + JSON.stringify(error));

      });
    }else{
      this.myValuerecon = false;
      this.asscode = '';
      this.descp = '';
      this.department = '';
      this.presentAlert('Alert','No Data Found');
    }
  }

  processreconcilenew(){
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var hh = todayDate.getHours();
    var mm = todayDate.getMinutes();
    var ss = todayDate.getSeconds();
    var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss + "." + "000";
    var modest = 'A';

    var datarec = {
      'assetidrec': parseInt(this.assetidrecon),
      'branchidu': this.branchID,
      'functionidrec': this.functionID,
      'deprtid': parseInt(this.depid),
      'assetuser': this.assetuser,
      'mode': modest,
      'recrdte': finaltodayDate,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreconciliationnew',datarec, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.presentAlert('Success',' Processed Successfully');
      this.detailsrecon1=[];
      this.assetCode='';
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  showmore(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
}
showless(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
};
}
