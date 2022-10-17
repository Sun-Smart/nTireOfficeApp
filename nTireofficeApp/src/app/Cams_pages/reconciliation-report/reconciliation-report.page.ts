import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reconciliation-report',
  templateUrl: './reconciliation-report.page.html',
  styleUrls: ['./reconciliation-report.page.scss'],
})
export class ReconciliationReportPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  username:any;
  branch1;

  assetcodeResult;
  assetcode1;
  isItemAvailable;
  assetcode1str;
  assetcode;
  date1;
  date2;
  detailrecons;
  scannedCode;
  newasset: any;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private barcodeScanner: BarcodeScanner) {
    //,private qrScanner: QRScanner
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch1 = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');

   }

  ngOnInit() {
  }

  doRefresh(event){

    this.date1='';
    this.date2='';
    this.assetcode = '';
    this.detailrecons=[];
    event.target.complete();
  }

  getItems(ev: any) {
    this.newasset = ev.target.value;
    console.log(this.newasset);
    this.assetcode1 = [];
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

  //      scancoderecon(){
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        // camera permission was granted


  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCode=text;
  //           this.processasset(this.scannedCode)
  //          this.qrScanner.hide(); // hide camera preview
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
      this.processasset(this.scannedCode)
      }).catch(err => {
      console.log('Error', err);
      });
  }

  processasset(assetcode){
    this.assetcode = assetcode;
    this.isItemAvailable = false;
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

  processreconciliationrep(){
    console.log(this.date1);
    console.log(this.date2);
    if (this.date1 == null || this.date1 == undefined || this.date1 == "") {
      var date1 = '';
    } else {
      var date1 = this.datePipe.transform(this.date1,'yyyy-MM-dd')
    }
    if (this.date2 == null || this.date2 == undefined || this.date2 == "") {
      var date2 = '';
    } else {
      var date2 = this.datePipe.transform(this.date2,'yyyy-MM-dd')
    }

    if (this.assetcode == undefined) {
      var assetcode1 = '';
    } else {
      assetcode1 = this.assetcode;
    }

var status='';
    var datarep = {
      'functionidrep': this.functionID,
      'rfdate': date1,
      'rtdate': date2,
      'rassetcode': assetcode1,
      'rstatus': status,
      'rbranch': this.branchID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken

    }
    this.detailrecons = [];
    console.log(datarep);


  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');

  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreconciliationrep',datarep, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)

    this.detailrecons = resp;
    if (this.detailrecons.length < 1) {

      this.presentAlert("Alert","No Data Found");
    }
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });

  }

  resetreconrep(){
    this.assetcode='';
    this.date1='';
    this.date2='';
    this.detailrecons ='';
  }
}
