import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  username:any;
  isItemAvailable:boolean;
  assetcode1;
  Asset_code_det1r;
  scannedCode:any;
  assetcode;
  assetcodeResult;
  assetcode1str;
  reqdate;
  vendorcode;
  listviewdetails:any = [];
  listviewdetailsLength;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private barcodeScanner: BarcodeScanner) {
    //,private qrScanner: QRScanner
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');

    // this.getserviceList();
  }

  ngOnInit() {
    this.getserviceList();
  }
  getItems(ev: any) {
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

  //    scancoderecon(){
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
      cssClass:'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
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


  processassetservicereqfilter(){

    if (this.reqdate == null) {
      var dteserv = '';
    } else {
       dteserv = this.datePipe.transform(this.reqdate, 'yyyy-MM-dd');
    }
    if (this.assetcode == undefined) {
      var serlistassetcode = '';

    } else {
       serlistassetcode = this.assetcode;

    }
    if (this.vendorcode == undefined) {
      var serlistvendorcode = '';

    } else {
      serlistvendorcode = this.vendorcode;

    }
    var datalistprocess = {
      'assetcode': serlistassetcode,
      'vendorcode': serlistvendorcode,
      'datofservice': dteserv,
      'branchid': this.branchID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservreqlistviewfilter',datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.listviewdetails = resp;
      console.log(this.listviewdetails);
      
      this.listviewdetailsLength=this.listviewdetails.length;
      if (this.listviewdetails.length < 1) {

        this.presentAlert("Alert","No Data Found")
      }

    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  resetservicereqfilter(){
    var datalistprocess = {

      'branchid': this.branchID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservreqlistview',datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.listviewdetails = resp;
      this.listviewdetailsLength=this.listviewdetails.length;
      this.assetcode = '';
      this.vendorcode = '';
      this.reqdate = '';
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  getserviceList(){
    var datalistprocess = {

      'branchid': this.branchID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservreqlistview',datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.listviewdetails = resp;
      console.log(this.listviewdetails);
      
      this.listviewdetailsLength=this.listviewdetails.length;
      this.assetcode = '';
      this.vendorcode = '';
      this.reqdate = '';
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
}
