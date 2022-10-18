import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { json } from '@angular-devkit/core';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  isItemAvailable:boolean;
  isVendorItemAvailable:boolean;
  isrespItemAvailable:boolean;
  vendorid;
  assetcode1;
  vendor_code_det1;
  Asset_code_det1r;
  scannedCode:any;
  scannedCoderep:any;
  detailsreqcat:any;
  assetcodeResult:any;
  assetcode1str:any;
  assetcode:any;
  ServiceExpensenew = [];

  RequestRef:any;
  ASSETCODEASSETDESCRIPTION:any;
  RequestDate:any;
  VENDORCODE:any;
  DATEOFSERVICE:any;
  EXPECTEDDATEOFDELIVERY:any;
  SERVICETYPE:any;
  Status:any;
  workflow_no:any;
  ServiceRefshow:boolean;
  Serviceshow:boolean;
  departmentreqs:any;
  detailsser:any;
  detailsser1=[];
  assetid:any;
  createdby:any;
  insucompany:any;
  insuamount:any;
  warrantydte:any;
  myValue:boolean;
  vendor_code_det:any;
  vendorcode:any;
  detailsservendor:any;
  detailsservendor1=[];
  repassetcode;
  Asset_code_detr;
  departmentreqreplace;
  repdatalist:any;
  repdatalist1=[];
  repassetid;
  detailssercat;
  reqdate;
  expdate;
  servicecategory;
  noofcharsdectest;
  expexpense;
  replacement;
  tilldate;
  assetdescpshow;
  ifromdte;
  scannedCode1;
  username:any;
  today1;
  newExpense: number;
  newasset: any;
  newvendor: any;
  newreplaceasset: any;
  assetucode: any;
  numberOnly(event):boolean{
    const charCode = (event.which)?event.which:event.keyCode;
    if(charCode >31 &&(charCode<48||charCode>57)){
      return false;
    }
    return true;
  }
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
    this.getServiceActegory();
    this.replacement="<< Select >>";
    this.servicecategory="<< Select >>";

    this.today1 = new Date().toJSON().split('T')[0];
    var today = new Date();
    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "/" + day + "/" + year;
    this.reqdate = finaltodayDate;
    // this.ServiceExpensenew = [];
    // this.ServiceExpensenew=$rootScope.ServiceExpname;

  //    if(this.ServiceExpensenew!=undefined){

  //    this.RequestRef=this.ServiceExpensenew[0].RequestRef;
  //    this.ASSETCODEASSETDESCRIPTION=this.ServiceExpensenew[0].ASSETCODEASSETDESCRIPTION;
  //    this.RequestDate=this.ServiceExpensenew[0].RequestDate;
  //    this.VENDORCODE=this.ServiceExpensenew[0].VENDORCODE;
  //    this.DATEOFSERVICE=this.ServiceExpensenew[0].DATEOFSERVICE;
  //    this.EXPECTEDDATEOFDELIVERY=this.ServiceExpensenew[0].EXPECTEDDATEOFDELIVERY;
  //    this.SERVICETYPE=this.ServiceExpensenew[0].SERVICETYPE;

  //    console.log(this.RequestDate);

  //    this.Status=this.ServiceExpensenew[0].Status;
  //    this.workflow_no=this.ServiceExpensenew[0].workflow_no;
  //  }
  //  // alert("RequestRef"+$scope.RequestRef);
  //    if(this.RequestRef!=undefined){

      //  this.ServiceRefshow=true;
      //  this.Serviceshow=false;

    //  }
    //  else{

       this.ServiceRefshow=false;
       this.Serviceshow=true;
    //  }

   }

  ngOnInit() {
  }

  doRefresh(event){
    this.getServiceActegory();
    this.reset();
    event.target.complete();
  }
  getItems(ev: any) {
    debugger;
    this.assetcode1 = [];
    this.newasset = ev.target.value;
    console.log(this.newasset);
    
    if (ev.target.value == "") {
      this.assetcode1 = [];
      console.log(this.assetcode1);
      
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
  // scancoderecon(){
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
    this.detailsser1=[];
    this.assetcode = assetcode;
    this.isItemAvailable = false;
    var data = {
      'functionid':parseInt(this.functionID),
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
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetserreqdept',data, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
    this.departmentreqs = resp[0].Text;
    console.log(this.departmentreqs);

  }, error => {
    console.log("error : " + JSON.stringify(error));

  });
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservicelist',data, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
    var alassetrss = resp;
      this.detailsser = resp;
      console.log(this.detailsser);
    if (this.detailsser.length < 1) {

      this.presentAlert("Alert","No Data Found");
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
      'functionid':parseInt( this.functionID),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken,
      'vendorcode':this.newvendor
    }
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/vendorcodelist',dataservv, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.vendor_code_det = resp;
      for (var i = 0; i < this.vendor_code_det.length; i++) {
        // $scope.user_type1 = $scope.user_type[i].DESCRIPTION;
        this.vendor_code_det1.push(this.vendor_code_det[i].Vendor_Code+' - '+this.vendor_code_det[i].Vendor_Name);


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

  fetchservsvendorreq(item){
    this.detailsservendor1=[];
    this.vendorcode=item;
    this.isVendorItemAvailable=false;
    this.vendorcode=item.split('-');
    console.log(this.vendorcode)
    var dataserv = {
      'vendorcode': this.vendorcode[0],
      'functionid': parseInt(this.functionID),
      'access_token':this.accessToken,
      'userid':this.userID,
        'usertoken':this.userToken
    }
    console.log(dataserv);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservicevendorlist',dataserv, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.detailsservendor=resp;
      console.log(this.detailsservendor);
      this.detailsservendor1.push(resp[0]);
      this.vendorid = resp[0].vendor_id;
        //$scope.detailsdept = response.data.recordsets[1];
        console.log(this.vendorid);
    }, error => {
      console.log("error : " + JSON.stringify(error));

    });

  }

  getreplaceItems(ev){
    this.newreplaceasset =ev.target.value;

    this.Asset_code_det1r = [];
    if (ev.target.value == "") {
      this.Asset_code_det1r = [];
      this.isrespItemAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    var dataservv = {
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken,
      'assetcode' : this.newreplaceasset,
    }
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetcodereplace',dataservv, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.Asset_code_detr = resp;
      for (var i = 0; i < this.Asset_code_detr.length; i++) {
        // $scope.user_type1 = $scope.user_type[i].DESCRIPTION;
        this.Asset_code_det1r.push(this.Asset_code_detr[i].ASSET_CODE);


      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isrespItemAvailable = true;
        this.Asset_code_det1r = this.Asset_code_det1r.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });


  }
  // scancodeuserservrep(){
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        // camera permission was granted


  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCoderep=text;
  //           this.fetchservsreqreplace(this.scannedCoderep)
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
  scancodeuserservrep(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode1=barcodeData.text;
      this.fetchservsreqreplace(this.scannedCode1)
      }).catch(err => {
      console.log('Error', err);
      });
  }

  fetchservsreqreplace(item){
    this.repdatalist1=[];
    this.repassetcode=item;
    this.isrespItemAvailable=false;
    if (this.assetcode != item) {

      var dataser1 = {
        'functionid':parseInt(window.localStorage['FUNCTION_ID']),
        'assetcode': this.repassetcode,
        'branchid': this.branchID,
        'access_token':this.accessToken,
        'userid':this.userID,
        'usertoken':this.userToken
      }
  const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetserreqdept',dataser1, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp)

        this.departmentreqreplace = resp[0].Text;
        console.log(this.departmentreqreplace);
      }, error => {
        //this.presentAlert('Alert','Server Error,Contact not loaded');
        console.log("error : " + JSON.stringify(error));

      });
      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservicelistreplace',dataser1, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp)

        this.repdatalist=resp;

        //$scope.detailsser1 = response.data[0];
        // var alassetrsrepc = this.repdatalist;
        // console.log(alassetrsrepc.length);
        if (this.repdatalist.length  != 0) {
          this.repdatalist1.push(resp[0]);
          this.repassetid = resp[0].pmm_asset_reference;
          console.log(this.repassetid);
          //console.log($scope.asstreq.descp);

        } else {
          this.presentAlert("Alert","No Data Found");

        }
      }, error => {
        //this.presentAlert('Alert','Server Error,Contact not loaded');
        console.log("error : " + JSON.stringify(error));

      });

  }else{
    this.presentAlert("Alert","Asset Code and replacement asset code should not be same");
  }
}

getServiceActegory(){
  var dataservcat = {
    'functionid':parseInt(window.localStorage['FUNCTION_ID']),
    'access_token':this.accessToken,
    'userid':this.userID,
    'usertoken':this.userToken
  }
  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetservicecategory',dataservcat, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)

    this.detailssercat = resp;
    console.log(this.detailssercat);
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
}

processassetservicereq(){
  var todayDate = new Date();
  var day = todayDate.getDate();
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getFullYear();
  var hh = todayDate.getHours();
  var ss = todayDate.getMinutes();
  var mm = todayDate.getSeconds();
  //var finaltodayDateservices = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss + "." + "000";
  var finaltodayDateservices = day + "-" + month + "-" + year + " " + hh + ":" + mm + ":" + ss;
  var warrantydtenew = this.datePipe.transform(this.warrantydte, 'dd-MM-yyyy');
  var dater = this.datePipe.transform(this.reqdate, 'dd-MM-yyyy HH:mm:ss');

  var datewar = this.datePipe.transform(this.expdate, 'dd-MM-yyyy HH:mm:ss');

  if (this.servicecategory == "" || this.servicecategory == undefined ||this.servicecategory == "<< Select >>") {
    var categ = 0;
  } else {
    categ = parseInt(this.servicecategory);

  }
  if (this.noofcharsdectest == undefined) {
    var descp = "";
  } else {
    descp = this.noofcharsdectest;

  }
  if (this.repassetid == undefined) {
    var repid = 0;
  } else {
    repid = parseInt(this.repassetid);

  }
  if (this.expexpense == undefined) {
    var exp = 0;
  } else {
    exp = parseInt(this.expexpense);
    // this.newExpense = exp;

  }
  if (this.replacement == undefined || this.replacement == "" || this.replacement == '<< Select >>') {
    var reptype = "";
  } else {
     reptype = this.replacement;

  }

  if(this.replacement == 'T'){
    if (this.tilldate == undefined) {
      this.presentAlert("Alert","Enter the Till Date");
      return false;
    } else {
     var sertilldte = this.datePipe.transform(this.tilldate, 'dd-MM-yyyy');
    }

  }else{
    var sertilldte = "";
  }

  if (this.insucompany == null) {
    var insucompny = "";
  } else {
     insucompny = this.insucompany;

  }
  if (this.insuamount == null) {
    var insuamt = 0;
  } else {
    insuamt = parseInt(this.insuamount);

  }

  if (warrantydtenew == undefined) {
    var wardte = "";
  } else {
    var wardte = warrantydtenew;

  }




  var assetcodeservice = this.assetcode + '~' + this.assetdescpshow;

  var dataprocessserv = {
    'serfunctionid': this.functionID,
    'serbranchid': this.branchID,
    'serassetcode': assetcodeservice,
    'serassetid': parseInt(this.assetid),
    'servendorid': parseInt(this.vendorid),
    'servendorcode': this.vendorcode[0],
    //'servendorcode':$scope.asstdtlsser.vendorcode,
    'serdateofservice': dater,
    'serexpdateofdelivery': datewar,
    'serdescription': descp,
    'serexpexpense': exp,
    //'serexpexpense':$scope.asstdtlsser.expexpense,
    'sercreatedby': this.userID,
    'serinsucompany': insucompny,
    'seramountinsu': insuamt,
    'serwarrantydte': wardte,
    'serreplacetype': reptype,
    'serreplaceassetid': repid,
    'servicecategory': categ,
    'sercreatedon': finaltodayDateservices,
    'assetreqby': this.userID,
    'srvtilldate': sertilldte,
    'userid':this.userID,
    'usertoken':this.userToken,
    'access_token':this.accessToken
  }
  console.log(dataprocessserv);

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetserviceinsert',dataprocessserv, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp)
  this.presentAlert("Success","Successfully Saved");
  this.reset();
  }, error => {
    //this.presentAlert('Alert','Server Error,Contact not loaded');
    console.log("error : " + JSON.stringify(error));

  });
}

assetserviceliveview(){
this.router.navigate(['/service-list']);
}


reset(){
  this.assetcode='';
  this.detailsser1=[];
  this.vendorcode='';
  this.detailsservendor1=[];
  this.expdate='';
  this.expexpense='';
  this.tilldate='';
  this.repassetcode='';
  this.repassetid='';
  this.repdatalist1=[];
  this.noofcharsdectest='';
  this.replacement="<< Select >>";
  this.servicecategory="<< Select >>";
}
}
