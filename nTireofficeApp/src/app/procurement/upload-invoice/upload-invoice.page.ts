import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';

import { Platform } from '@ionic/angular';



declare var window;
declare let cordova: any;
@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.page.html',
  styleUrls: ['./upload-invoice.page.scss'],

})
export class UploadInvoicePage implements OnInit {
  @ViewChild('popover') popover;

  isOpen = false;
  public invoiceform = new FormGroup({
    pocode:new FormControl(''),
    invoicenumber: new FormControl('', Validators.compose([Validators.required])),
    fromDate: new FormControl(''),
    invoiceamount: new FormControl(''),
    documentupload: new FormControl(''),
    invoiceremark: new FormControl(''),
  });
  pdfSrc :any=[];
  pageVariable = 1;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  dat_valid;

  cardshow: boolean = false;
  arr: any = [];
  invoicedata: any;
  getinvoice: any = [];
  url: string | ArrayBuffer;
  filename: any;
  pdfimg: any;
  pdfdata: any;
  fest: any=[];
  open: any;
  openfile: any;
  getopen: string;

  windowop: any;
  filePath: string;
  branchID: string;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  poinvoicecode: any[];
  isPropertycodeAvailable: boolean;
  poinvoive_no: any;
  poid: any;
  ponumber: any;
  conven: any;
  uploaddata: any;
  browser: any;
  invoiceget: any;
  constructor( public alertController: AlertController,private modalCtrl: ModalController,private iab: InAppBrowser, public platform: Platform , public Ipaddressservice: IpaddressService,  private http: HttpClient) {

    this.dat_valid = {
      currentDate: new Date()


    };

    this.branchID = localStorage.getItem('setbranchid');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
    // this.Formdata={

    // }

    // this.data={
    //   invoiceno:"invoicenumber",
    //   invoiceDate:"",
    //   invoiceamt:"",
    //   remark:"",
    // }
  }

  ngOnInit() {

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


  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  };

  get f() {
    return this.invoiceform.controls;
  }


  getinvoiceCode(e:any){


    this.poinvoicecode = [];
    if (e.target.value == "") {
      this.poinvoicecode = [];
      this.isPropertycodeAvailable = false;
    }
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.branchID = localStorage.getItem('setbranchid');

    // const header = new Headers();
    // header.append("Content-Type", "application/json");
     let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getponnumber/' +this.functionID+ "/" +  this.branchID + "/" + e.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.poinvoicecode = [];
      this.isPropertycodeAvailable = false;

  this.poinvoive_no=resp
  for (var i = 0; i < this.poinvoive_no.length; i++) {
    this.poinvoicecode.push({
      po_number: this.poinvoive_no[i].po_number,

    });
  };

  const val = e.target.value;
  if (val && val.trim() != '') {
    this.isPropertycodeAvailable = true;
    this.poinvoicecode = this.poinvoicecode.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }

    })
  }






  addponumbercode(item:any){
    console.log(item,"item");
    this.poid=item.po_id;
    this.ponumber=item.po_number;
    this.isPropertycodeAvailable = false;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getpo_invoiceamount/' +  this.functionID + "/" +     this.branchID + "/" + this.poid, {
      headers: headers,
    }).subscribe(resp => {

      console.log(resp,"num");

      // this.invoiceget = resp[0].po_amount
      this.invoiceform.value.invoiceamount=resp[0].po_amount;
      this.invoiceform.get('invoiceamount').setValue(this.invoiceform.value.invoiceamount)

      console.log( this.invoiceform.value.invoiceamount,"o");



    });
  }




  additem() {

if(this.invoiceform.value.invoicenumber==""|| this.invoiceform.value.invoicenumber=="undefined" || this.invoiceform.value.invoicenumber==null){
  this.presentAlert("add item failed",'Please Enter All Details');
}else if(this.invoiceform.value.fromDate==""|| this.invoiceform.value.fromDate=="undefined" || this.invoiceform.value.fromDate==null){
  this.presentAlert("add item failed",'Please Enter  All Details');
}else  if(this.invoiceform.value.pocode==""|| this.invoiceform.value.pocode=="undefined" || this.invoiceform.value.pocode==null){
  this.presentAlert("add item failed",'Please Enter  All Details');
  }else   if(this.invoiceform.value.documentupload==""|| this.invoiceform.value.documentupload=="undefined" || this.invoiceform.value.documentupload==null){
    this.presentAlert("add item failed",'Please Enter All Details');
  }else if(this.invoiceform.value.invoiceremark==""|| this.invoiceform.value.invoiceremark=="undefined" || this.invoiceform.value.invoiceremark==null){
    this.presentAlert("add item failed",'Please Enter All Details');
  }else if(this.invoiceform.value.invoiceamount==""|| this.invoiceform.value.invoiceamount=="undefined" || this.invoiceform.value.invoiceamount==null){
    this.presentAlert("add item failed",'Please Enter All Details');
  }
else{

let data={

  "filename": this.filename,
  "functionid": this.functionID ,
  "branchid": this.branchID,
  "poid":this.poid,
  "invoicedate":this.invoiceform.value.fromDate,
  "invoiceref":this.invoiceform.value.invoicenumber.toString(),
  "invoiceamount":this.invoiceform.value.invoiceamount.toString(),
  "remarks":this.invoiceform.value.invoiceremark,
  "userid": this.userID ,
  "filedata":this.pdfdata

}
console.log(data);
debugger
let options = new HttpHeaders().set('Content-Type', 'application/json');
this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'uploadinvoice/', data,{ headers: options,responseType: 'text'}).subscribe(res => {


if(res="Uploaded successfully"){
  this.presentAlert1("add item Success",'Insert Successfully');
  this.invoiceform.reset();
}
})





//       this.invoicedata = [
//         {
//           invoicenumber: this.invoiceform.value.invoicenumber,
//           fromDate: this.invoiceform.value.fromDate,
//           invoiceamount: this.invoiceform.value.invoiceamount,
//           documentupload: this.filename,
//           invoiceremark: this.invoiceform.value.invoiceremark,
//         }
//       ]

//       console.log(this.invoicedata, 'formvalue')


//       this.cardshow = true

//       // this.getinvoice = this.arr
//       console.log(this.getinvoice);



//       for (let i = 0; i < this.invoicedata.length; i++) {
//         this.getinvoice.push(this.invoicedata[i]);
//         console.log(this.getinvoice);

//         // this.getinvoice = this.arr[i];
//       }
//       this.invoiceform.reset();


//    this.pdfdata=this.url.slice(28)

//  console.log( this.pdfdata);
//  const byteArray = new Uint8Array(
//    atob( this.pdfdata)
//      .split("")
//      .map(char => char.charCodeAt(0))
//  );
//  const file = new Blob([byteArray], { type: "application/pdf" });
//  const fileURL = URL.createObjectURL(file);
//  var obj = {
//    test:this.url,
//    test2:this.invoicedata[0].invoicenumber,
//  }
//  this.pdfSrc.push(obj);
//  console.log(this.pdfSrc,"pdfsrc")
  }
}





onSelectFile(event) {


  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      console.log(this.url);
      this.pdfdata=this.url.slice(28)
    }

    // reader.readAsArrayBuffer($img.files[0]);
    // console.log( $img.files[0]);
    // this.pdfimg= $img.files[0]
  }

 this.filename=event.target.files[0].name
 console.log(this.filename);



}
omit_special_chart(event) {
  var k;
  k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}




// preview pfd

// openpdf(invoiceNumber){
//  debugger
//   var test = this.pdfSrc.filter(src=> {
//     debugger
//     if(src.test2 == invoiceNumber) {
//       debugger
//       return src.test;
//     }
//   })


//  this.open=test[0].test

//  console.log(this.open);
//  this.openfile=this.open.slice(5)
//  window.PreviewAnyFile.previewBase64(
//    success=>console.log("on success",success),
//   error=>console.log("on error", error),
//   this.open

//  )
// }






















// removeItem(index : number){
//   this.getinvoice.splice(index,1);
// }





}
