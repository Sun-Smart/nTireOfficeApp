import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  userID: any;
  usertype: any;
  function: any;
  branch: any;
  userToken: any;
  accessToken: any;
  branchID: any;
  functionID: any;
  username: any;
  isItemAvailable: boolean;
  assetcode1;
  Asset_code_det1r;
  scannedCode: any;
  assetcode;
  assetcodeResult;
  assetcode1str;
  reqdate;
  vendorcode: any;
  listviewdetails: any;
  listviewdetailsLength;
  newvendor: any;
  vendor_code_det;
  vendor_code_det1;
  isVendorItemAvailable: boolean;
  detailsservendor: any;
  detailsservendor1 = [];
  vendorid;
  departmentreqs: any;
  detailsser: any;
  detailsser1 = [];
  assetucode: any;
  assetdescpshow;
  assetid: any;
  createdby: any;
  insucompany: any;
  insuamount: any;
  warrantydte: any;
  myValue: boolean;
  ifromdte;


  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService, private router: Router, private barcodeScanner: BarcodeScanner) {
    //,private qrScanner: QRScanner
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');

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

  processasset(assetcode) {
    this.detailsser1 = [];
    this.assetcode = assetcode;
    this.isItemAvailable = false;
    var data = {
      'functionid': parseInt(this.functionID),
      'assetcode': assetcode,
      'branchid': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(data);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetserreqdept', data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.departmentreqs = resp[0].Text;
      console.log(this.departmentreqs);

    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetservicelist', data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      var alassetrss = resp;
      this.detailsser = resp;
      console.log(this.detailsser);
      if (this.detailsser.length < 1) {

        this.presentAlert("Alert", "No Data Found");
      } else {
        this.detailsser1.push(resp[0]);
        this.assetucode = resp[0].ASSET_CODE;
        this.assetdescpshow = resp[0].pmm_asset_desc;
        this.assetid = resp[0].ASSET_ID;
        this.createdby = resp[0].ASSET_USER;
        this.insucompany = resp[0].pmm_insurance_company;
        this.insuamount = resp[0].AMOUNT;
        this.warrantydte = resp[0].pmm_warenty_expiry[0];
        this.ifromdte = resp[0].pmm_insurance_expiry[0];
        //$scope.detailsdept = response.data.recordsets[1];
        console.log(this.assetid);
        this.myValue = true;
      }

    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }


  scancoderecon() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode = barcodeData.text;
      this.processasset(this.scannedCode)
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
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


  getVendorItems(ev: any) {
    this.vendor_code_det1 = [];
    this.newvendor = ev.target.value;
    if (ev.target.value == "") {
      this.vendor_code_det1 = [];
      this.isVendorItemAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    var dataservv = {
      //'vendorcode':$scope.asstdtlsser.vendorcode,
      'functionid': parseInt(this.functionID),
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken,
      'vendorcode': this.newvendor
    }
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/vendorcodelist', dataservv, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.vendor_code_det = resp;
      for (var i = 0; i < this.vendor_code_det.length; i++) {
        // $scope.user_type1 = $scope.user_type[i].DESCRIPTION;
        this.vendor_code_det1.push(this.vendor_code_det[i].Vendor_Code + ' - ' + this.vendor_code_det[i].Vendor_Name);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isVendorItemAvailable = true;
        this.vendor_code_det1 = this.vendor_code_det1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    },
      // , error => {
      //   //this.presentAlert('Alert','Server Error,Contact not loaded');
      //   // console.log("error : " + JSON.stringify(error));

      // }
    );

  }


  fetchservsvendorreq(item) {
    this.detailsservendor1 = [];
    this.vendorcode = item;
    this.isVendorItemAvailable = false;
    this.vendorcode = item.split('-');
    console.log(this.vendorcode)
    var dataserv = {
      'vendorcode': this.vendorcode[0],
      'functionid': parseInt(this.functionID),
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(dataserv);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetservicevendorlist', dataserv, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.detailsservendor = resp;
      console.log(this.detailsservendor);
      this.detailsservendor1.push(resp[0]);
      this.vendorid = resp[0].vendor_id;
      //$scope.detailsdept = response.data.recordsets[1];
      console.log(this.vendorid);
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });

  }

  processassetservicereqfilter() {

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
      serlistvendorcode = this.vendorcode[0];

    }
    var datalistprocess = {
      'assetcode': serlistassetcode,
      'vendorcode': serlistvendorcode,
      'datofservice': dteserv,
      'branchid': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetservreqlistviewfilter', datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      if (resp == null || resp == "No data found" || resp == "[]") {
        this.listviewdetails = [];
      } else {
        this.listviewdetails = resp;

        console.log(this.listviewdetails);
        this.listviewdetailsLength = this.listviewdetails.length;
        this.assetcode = '';
        // this.vendorcode = '';
        this.reqdate = '';
        if (this.listviewdetails.length < 1) {

          this.presentAlert("Alert", "No Data Found")
        }
      }

    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  resetservicereqfilter() {
    var datalistprocess = {

      'branchid': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetservreqlistview', datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);

      if (resp == null || resp == "No data found" || resp == "[]") {
        this.listviewdetails = [];
      } else {
        this.listviewdetails = resp;

        console.log(this.listviewdetails);
        this.listviewdetailsLength = this.listviewdetails.length;
        this.assetcode = '';
        this.vendorcode = '';
        this.reqdate = '';
      }



    }, error => {
      console.log("error : " + JSON.stringify(error));

    });
  }

  getserviceList() {
    var datalistprocess = {

      'branchid': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
    }
    console.log(datalistprocess);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlCamsNode + '/assetservreqlistview', datalistprocess, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);

      if (resp == null || resp == "No data found" || resp == "[]") {
        this.listviewdetails = [];
      } else {
        this.listviewdetails = resp;

        console.log(this.listviewdetails);
        this.listviewdetailsLength = this.listviewdetails.length;
        this.assetcode = '';
        this.vendorcode = '';
        this.reqdate = '';
      }


    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
}
