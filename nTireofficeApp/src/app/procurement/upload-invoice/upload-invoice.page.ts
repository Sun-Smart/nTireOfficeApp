import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.page.html',
  styleUrls: ['./upload-invoice.page.scss'],
})
export class UploadInvoicePage implements OnInit {
  @ViewChild('popover') popover;

  isOpen = false;
  public invoiceform = new FormGroup({
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
  constructor( public alertController: AlertController,private modalCtrl: ModalController) {

    this.dat_valid = {
      currentDate: new Date()


    };

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

  get f() {
    return this.invoiceform.controls;
  }
  additem() {

if(this.invoiceform.value.invoicenumber==""|| this.invoiceform.value.invoicenumber=="undefined" || this.invoiceform.value.invoicenumber==null){
  this.presentAlert("add item failed",'Please Enter All Fields');
}else if(this.invoiceform.value.fromDate==""|| this.invoiceform.value.fromDate=="undefined" || this.invoiceform.value.fromDate==null){
  this.presentAlert("add item failed",'Please Enter All Fields');
}else  if(this.invoiceform.value.invoiceamount==""|| this.invoiceform.value.invoiceamount=="undefined" || this.invoiceform.value.invoiceamount==null){
  this.presentAlert("add item failed",'Please Enter All Fields');
  }else   if(this.invoiceform.value.documentupload==""|| this.invoiceform.value.documentupload=="undefined" || this.invoiceform.value.documentupload==null){
    this.presentAlert("add item failed",'Please Enter All Fields');
  }else if(this.invoiceform.value.invoiceremark==""|| this.invoiceform.value.invoiceremark=="undefined" || this.invoiceform.value.invoiceremark==null){
    this.presentAlert("add item failed",'Please Enter All Fields');
  }
else{


      this.invoicedata = [
        {
          invoicenumber: this.invoiceform.value.invoicenumber,
          fromDate: this.invoiceform.value.fromDate,
          invoiceamount: this.invoiceform.value.invoiceamount,
          documentupload: this.filename,
          invoiceremark: this.invoiceform.value.invoiceremark,
        }
      ]

      console.log(this.invoicedata, 'formvalue')


      this.cardshow = true

      // this.getinvoice = this.arr
      console.log(this.getinvoice);



      for (let i = 0; i < this.invoicedata.length; i++) {
        this.getinvoice.push(this.invoicedata[i]);
        console.log(this.getinvoice);

        // this.getinvoice = this.arr[i];
      }
      this.invoiceform.reset();


   this.pdfdata=this.url.slice(28)

 console.log( this.pdfdata);
 const byteArray = new Uint8Array(
   atob( this.pdfdata)
     .split("")
     .map(char => char.charCodeAt(0))
 );
 const file = new Blob([byteArray], { type: "application/pdf" });
 const fileURL = URL.createObjectURL(file);
 var obj = {
   test:fileURL,
   test2:this.invoicedata[0].invoicenumber,
 }
 this.pdfSrc.push(obj);
 console.log(this.pdfSrc,"pdfsrc")
  }
}





onSelectFile(event) {

 
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
    // reader.readAsArrayBuffer($img.files[0]);
    // console.log( $img.files[0]);
    // this.pdfimg= $img.files[0]
  }

 this.filename=event.target.files[0].name
 console.log(this.filename);


 
}

openpdf(invoiceNumber){
 debugger
  var test = this.pdfSrc.filter(src=> {
    debugger
    if(src.test2 == invoiceNumber) {
      debugger
      return src.test;
    }
  })
  window.open(test[0].test)
  // console.log(this.pdfSrc);

  // for (let i = 0; i < this.pdfSrc.length; i++) {
          
  //         this.fest.push(this.invoicedata[i]);
    // console.log(this.getinvoice);

    // this.getinvoice = this.arr[i];
  // }
}

// async createModal() {
//   const model = await this.modalCtrl.create({
//     component: PdfModalPage,
//     componentProps: { Data:this.url }
//   });
//   return await model.present();
// };





removeItem(index : number){
  this.getinvoice.splice(index,1);
}



}
