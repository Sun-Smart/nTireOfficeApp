import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-asset-transfer',
  templateUrl: './asset-transfer.page.html',
  styleUrls: ['./asset-transfer.page.scss'],
})
export class AssetTransferPage implements OnInit {

  userID: any;
  usertype: any;
  function: any;
  branch: any;
  userToken: any;
  accessToken: any;
  branchID: any;
  functionID: any;

  custType: any;
  type = false;

  assetcodeResult;
  assetcode1;
  isItemAvailable;
  assetcode1str;
  assetcode;
  arr;
  detailfrombranch;
  assttransfer1;
  detailfromidbranch;
  detailassetid;
  detailassetdepart;
  detailownerid;
  detailassetcategory;
  detailtobranch;
  tobranch;
  assetintcode1;
  isintItemAvailable;
  assetcodeintResult;
  assetcode1strint;
  assetcodei;
  arri;
  detailfrombranchi;
  detailassetdecpi;
  detailownercodei;
  departmenttransferi;
  assttransfer1i;
  detailfromidbranchi;
  detailassetidi;
  detailassetdeparti;
  detailowneridi;
  detailassetcategoryi;
  detailtobranchi;
  remarksi;
  scannedCode;
  username: any;
  newasset: any;
  assetinternal: any;
  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService, private router: Router, private barcodeScanner: BarcodeScanner) {
    //private qrScanner: QRScanner
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.custType = 'YES';
    this.customerType(this.custType);
    this.getToBranch();
    this.getToBranchi();

    this.tobranch = "<< Select >>"
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.custType = 'YES';
    this.customerType(this.custType);
    this.getToBranch();
    this.getToBranchi();
    this.assetcode = '';
    this.detailfromidbranch = '';
    this.assetcodei = '';
    this.detailassetdecpi = '';
    this.detailownercodei = '';
    this.departmenttransferi = '';
    this.tobranch = "<< Select >>"
    this.remarksi = '';
    event.target.complete();
  }

  customerType(e) {
    // console.log(e)
    if (this.custType == 'YES') {
      this.type = true;

    } else {
      this.type = false;
    }
  }

  getItems(ev: any) {
    console.log('event check', ev);

    this.detailfrombranchi = '';
    this.detailassetdecpi = '';
    this.detailownercodei = '';
    this.departmenttransferi = '';
    this.assetcodei = '';
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
      "assetcode": this.newasset,
    };
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetcodelist', params, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.assetcodeResult = resp;
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
  scancoderecon() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode = barcodeData.text;
      this.processasset(this.scannedCode)
    }).catch(err => {
      console.log('Error', err);
    });
  }

  processasset(assetcode) {
    this.assetcode = assetcode;
    this.isItemAvailable = false;
    var datafb = {
      'functionidrep': this.functionID,
      'fassetcode': this.assetcode,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken

    }
    console.log(datafb);
    if (this.assetcode != undefined) {
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransferfrombranch', datafb, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        this.arr = resp;

        if (this.arr == "norecord") {

          this.presentAlert1
          ("Alert", "No Data Found");
          this.detailfrombranch = '';
          this.assetcode = '';
        } else {

          if (this.arr != "This Asset Already Transferred") {
            //$http.post("http://mydesk.nextit.in:8165/assettransferfrombranch", datafb).then(function(response) {
            this.assttransfer1 = resp;
            //var alt1 = response.data;
            //console.log(alt1.length);
            if (this.assttransfer1.length != 0) {
              //$state.go('tab.dash');
              this.detailfrombranch = this.assttransfer1[0].BRANCH_DESC;
              this.detailfromidbranch = this.assttransfer1[0].BRANCH_ID;
              this.detailassetid = this.assttransfer1[0].ASSET_ID;
              this.detailassetdepart = this.assttransfer1[0].ASSET_DEPARTMENT;
              this.detailownerid = this.assttransfer1[0].ASSET_OWNER_ID;
              this.detailassetcategory = this.assttransfer1[0].ASSET_CATEGORY;
              //$scope.detailsdept = response.data.recordsets[1];
              console.log(this.detailassetdepart);

            } else {
              this.presentAlert1("Alert", "No Data Found");
              this.detailfrombranch = '';
              this.assetcode = '';
            }
          } else {
            this.presentAlert1("Alert", "This Asset Already Transferred");
            this.detailfrombranch = '';
            this.assetcode = '';
          }

        }

      }, error => {
        console.log("error : " + JSON.stringify(error));

      });
    } else {
      this.detailfrombranch = '';
      this.assetcode = '';
    }

  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  };

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

  getToBranch() {
    var datatb = {
      'functionidrep': this.functionID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken

    }
    console.log(datatb);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransfertobranch', datatb, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.detailtobranch = resp;

    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  processassettransfer() {
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var hh = todayDate.getHours();
    var mm = todayDate.getMinutes();
    var ss = todayDate.getSeconds();
    //var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss + "." + "000";
    var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;

    var dataub = {
      'functionidrep': this.functionID,
      'uassetcode': this.assetcode,
      'oldbranchid': parseInt(this.detailfromidbranch),
      'ubranchid': parseInt(this.tobranch),
      'assetid': parseInt(this.detailassetid),
      'assetdepart': parseInt(this.detailassetdepart),
      'assetownerid': parseInt(this.detailownerid),
      'assetcategory': parseInt(this.detailassetcategory),
      'dateins': finaltodayDate,
      'createbytf': this.userID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken,
      "tansfertype": "E"
    }
    console.log(dataub);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransferupdatebranchnew', dataub, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      //  this.detailtobranch=resp;
      this.presentAlert("Success", "Transferred Initiated");

      this.assetcode = '';
      this.detailfromidbranch = '';
      this.detailfrombranch = '';
      this.tobranch = '';
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }



  getintItems(ev: any) {
    this.assetinternal = ev.target.value;
    console.log('ev.target.value ', ev.target.value);
    if (ev.target.value == "" || ev.target.value == null || ev.target.value == "undefined") {
      this.detailassetdecpi = "";
      this.detailownercodei = "";
      this.departmenttransferi = "";
    }


    this.assetintcode1 = [];
    if (ev.target.value == "") {
      this.assetintcode1 = [];
      this.isintItemAvailable = false;
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
      "assetcode": this.assetinternal,
    };
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetcodelist', params, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.assetcodeintResult = resp;
      this.assetcode1strint = this.assetcodeintResult;

      for (var i = 0; i < this.assetcode1strint.length; i++) {

        this.assetintcode1.push(this.assetcode1strint[i].ASSET_CODE);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isintItemAvailable = true;
        this.assetintcode1 = this.assetintcode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  scancodereconi() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode = barcodeData.text;
      this.frombranchi(this.scannedCode)
    }).catch(err => {
      console.log('Error', err);
    });
  }
  //        scancodereconi(){
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        // camera permission was granted


  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCode=text;
  //           this.frombranchi(this.scannedCode)
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

  frombranchi(assetcodei) {
    console.log(assetcodei)
    this.assetcodei = assetcodei;
    this.isintItemAvailable = false;
    var datafbi = {
      'functionidrep': this.functionID,
      'branch': this.branchID,
      'fassetcode': this.assetcodei,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken

    }
    console.log(datafbi);
    if (this.assetcodei != undefined) {
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransferfrombranchnew', datafbi, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        this.arri = resp;
        if (this.arri.Result == "This Asset Already Transferred  ") {
          this.presentAlert1("Alert", "This Asset Already Transferred");
          return;
        } else {
          if (this.arri == "norecord") {

            this.presentAlert1("Alert", "No Data Found");
            this.detailfrombranchi = '';
            this.detailassetdecpi = '';
            this.detailownercodei = '';
            this.departmenttransferi = '';
            this.assetcodei = '';

          }

          else {

            if (this.arri != "This Asset Already Transferred  ") {
              //$http.post("http://mydesk.nextit.in:8165/assettransferfrombranch", datafb).then(function(response) {
              this.assttransfer1i = resp;
              this.detailfrombranchi = '';
              this.detailassetdecpi = '';

              this.detailownercodei = '';
              this.departmenttransferi = '';
              // this.assetcodei = '';
              //var alt1 = response.data;
              //console.log(alt1.length);
              if (this.assttransfer1i.length != 0) {
                //$state.go('tab.dash');
                //this.detailfrombranch =this.assttransfer1i[0].BRANCH_DESC;
                this.detailfromidbranchi = this.assttransfer1i[0].BRANCH_ID;
                this.detailassetidi = this.assttransfer1i[0].ASSET_ID;
                this.detailassetdeparti = this.assttransfer1i[0].ASSET_DEPARTMENT;
                this.detailowneridi = this.assttransfer1i[0].ASSET_OWNER_ID;
                this.detailassetcategoryi = this.assttransfer1i[0].ASSET_CATEGORY;
                this.detailownercodei = this.assttransfer1i[0].Assetownercode;
                this.departmenttransferi = this.assttransfer1i[0].departmentdescription;
                this.detailassetdecpi = this.assttransfer1i[0].ASSET_DESCRIPTION;
                //$scope.detailsdept = response.data.recordsets[1];
                console.log(this.detailassetdeparti);

              } else {
                this.presentAlert1("Alert", "No Data Found");
                this.detailfrombranchi = '';
                this.detailassetdecpi = '';
                this.detailownercodei = '';
                this.departmenttransferi = '';
                this.assetcodei = '';
              }
            } else {
              // if (this.arri.Result == "This Asset Already Transferred  ") {
              this.presentAlert1("Alert", "This Asset Already Transferred");
              this.detailfrombranchi = '';
              this.detailassetdecpi = '';
              this.detailownercodei = '';
              this.departmenttransferi = '';
              this.assetcodei = '';
            }
            // }
          }
        }



      }, error => {
        console.log("error : " + JSON.stringify(error));

      });
    } else {
      this.detailfrombranchi = '';
      this.detailassetdecpi = '';
      this.detailownercodei = '';
      this.departmenttransferi = '';
      this.assetcodei = '';
    }

  }


  getToBranchi() {
    var datatbi = {
      'functionidrep': this.functionID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken

    }
    console.log(datatbi);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransfertobranch', datatbi, {
      headers: options,
    }).subscribe(resp => {

      console.log(resp);
      this.detailtobranchi = resp;
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }


  processassettransferi() {
    if (this.detailassetidi == undefined || this.detailassetidi == "undefined" || this.detailassetidi == null) {
      this.presentAlert('Alert', 'Select the AssetCode');
    } else {
      var todayDate = new Date();
      var day = todayDate.getDate();
      var month = todayDate.getMonth() + 1;
      var year = todayDate.getFullYear();
      var hh = todayDate.getHours();
      var mm = todayDate.getMinutes();
      var ss = todayDate.getSeconds();
      //var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss + "." + "000";
      var finaltodayDate = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;

      var dataubi = {
        'functionidrep': this.functionID,
        'uassetcode': this.assetcodei,
        'oldbranchid': parseInt(this.detailfromidbranchi),
        // 'ubranchid': this.tobranch,
        'remarks': this.remarksi,
        'assetid': parseInt(this.detailassetidi),
        'assetdepart': parseInt(this.detailassetdeparti),
        'assetownerid': parseInt(this.detailowneridi),
        'assetcategory': parseInt(this.detailassetcategoryi),
        'dateins': finaltodayDate,
        'createbytf': this.userID,
        'access_token': this.accessToken,
        'userid': this.userID,
        'usertoken': this.userToken,
        "tansfertype": "I"

      }
      console.log(dataubi);

      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assettransferupdatebranchnew', dataubi, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        //  this.detailtobranch=resp;
        this.presentAlert("Success", "Transferred Initiated");

        this.assetcodei = '';
        this.detailfromidbranchi = '';
        this.detailfrombranchi = '';
        this.detailtobranchi = '';
        this.detailownercodei = '';
        this.departmenttransferi = '';
        this.detailassetdecpi = '';
        this.remarksi = '';
      }, error => {
        console.log("error : " + JSON.stringify(error));

      });
    }
  }
}

