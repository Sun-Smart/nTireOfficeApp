import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.page.html',
  styleUrls: ['./user-request.page.scss'],
})
export class UserRequestPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  isItemAvailable:boolean;
  assetcode1;
  scannedCode:any;
  detailsreqcat:any;
  assttrecon:any;
  descp:any;
  department:any;
  assetcodeResult:any;
  assetcode1str:any;
  assetcode:any;
  doi:any;
  refmaxnum:any;
  categoryissue:any;
  priority:any;
  noofchars:any;
  username:any;
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
    this.priority="<< Select >>"
    this.getReferMax();

    var today = new Date();
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "/" + day + "/" + year;
    this.doi = finaltodayDate;
   }

  ngOnInit() {
  }

  doRefresh(event){
    this.getReferMax();
    this.assetcode='';
    this.descp='';
    this.department='';
    this.categoryissue = "<< Select >>";
    this.priority="<< Select >>";
    this.noofchars="";

    event.target.complete();
  }

  getItems(ev: any) {
    debugger;
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

  //  scancoderecon(){
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        // camera permission was granted


  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCode=text;
  //           this.fetchreconcilation(this.scannedCode)
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
      this.fetchreconcilation(this.scannedCode)
      }).catch(err => {
      console.log('Error', err);
      });
  }

  fetchreconcilation(assetcode){

        debugger;
    this.assetcode = assetcode;
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
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreq',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.assttrecon = resp;
      var altrec = this.assttrecon;
      console.log(altrec);
      if (altrec.length < 1) {
        this.presentAlert('Alert','No Data Found');
      } else {
        this.descp = this.assttrecon[0].ASSET_DESCRIPTION;
        this.department = this.assttrecon[0].Text;


        console.log(this.doi);
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreqcategory',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.detailsreqcat= resp;
      console.log(this.detailsreqcat);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
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

  getReferMax(){
    debugger;
    var check = "a";
    var datar = {
      'assetcoder': check,
      'access_token':localStorage.getItem('token'),
      'userid':this.userID,
      'usertoken':localStorage.getItem('usertoken'),
    }
    console.log(datar);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/refrencemax/',datar, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.refmaxnum = resp[0].refnum;
      console.log(this.refmaxnum);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  processassetre(){
    debugger;
    var assiss = this.categoryissue;
    console.log(assiss);

    if (this.categoryissue == undefined) {
      var reqcatg = '';

    } else {
       reqcatg = this.categoryissue;

    }

    var reqdte = this.datePipe.transform(this.doi, 'yyyy-MM-dd');

    var datar = {
      'assetcoder': this.assetcode,
      'branchidr': this.branchID,
      'assetdescription': this.descp,
      'departmentr': this.department,
      'reqdate': this.doi,
      'reqdate1': reqdte,
      'reqcatgeory': reqcatg,
      'priority': this.priority,
      'reqdetail': this.noofchars,
      'refmaxno': this.refmaxnum,
      'assetreqid': this.userID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(datar);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetreqinsert/',datar, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.presentAlert("Success","sucessfully request raised issue ref number :"+this.refmaxnum+"");
      this.descp='';
      this.department='';
      this.assetcode='';
      this.priority='';
      this.noofchars='';
      this.categoryissue='';
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }


}
