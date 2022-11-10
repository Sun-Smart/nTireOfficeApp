import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

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
  constructor( public alertController: AlertController,private modalCtrl: ModalController,private readonly iab: InAppBrowser, public platform: Platform) {

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
   test:this.url,
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

// openPDF (stringBase64PDF) {
//   debugger
//   fetch('data:application/pdf;base64,' + stringBase64PDF, {
//       method: "GET"
//   })
//   .then(res => res.blob()).then(blob => {
//     console.log("created blob");
//     this.file.createFile(this.file.dataDirectory, 'temp.pdf', true)
//     .then(() => {
//       console.log("file created");
//       this.file.writeFile(this.file.dataDirectory, 'temp.pdf', blob, { replace: true })
//       .then(res => {
//         console.log("file writed");
//         this.fileOpener.open(res.toInternalURL(), 'application/pdf')
//         .then((res) => {
//           console.log('file opened')
//         }).catch(err => {
//           console.log('open error')
//         });
//       }).catch(err => {
//         console.log('write error')     
//       });
//     }).catch(() => {
//       console.log("create error");
//     })
    
//   }).catch(err => {
//     console.log('blob error')
//   });
// }




openpdf(invoiceNumber){
 debugger
  var test = this.pdfSrc.filter(src=> {
    debugger
    if(src.test2 == invoiceNumber) {
      debugger
      return src.test;
    }
  })
  // this.iab.create('https://ionicframework.com/');
  // window.open(test[0].test)

 this.open=test[0].test
 
//  localStorage.setItem('open',this.open)
//  this.getopen=localStorage.getItem("open")
 console.log(this.open);
 this.openfile=this.open.slice(5)
 window.PreviewAnyFile.previewBase64(
   success=>console.log("on success",success),
  error=>console.log("on error", error),
  this.open
   
 )
// window.open(this.open +'.pdf');
//  console.log(window.open);
//  var pathFile = "";
//  var fileName ='PdfName.pdf';
// var contentFile =  this.open;
// // var contentType = "application/pdf";
// if (this.platform.is('ios')) {
//      pathFile = cordova.file.documentsDirectory
// } else {
//      pathFile = cordova.file.externalRootDirectory
// }
//         let filePath = (this.platform.is('android')) ? 
//         this.file.externalRootDirectory : this.file.cacheDirectory;
//         this.file.createFile(filePath, fileName, true)
//         .then(() => {
//   this.file.writeFile(filePath, fileName, contentFile,{ replace: true }).then(FileEntry => {
// console.log(FileEntry);

//   console.log("File created!");          
//   this.fileOpener.open(FileEntry.toURL(), 'application/pdf')
//     .then(() => console.log('File is opened'))
//     .catch(err => console.error('Error openening file: ' + err));
// })
// })
//   .catch((err) => {
//     console.error("Error creating file: " + err);
//     throw err;  
//   });




//  console.log(this.openfile);
//  this.fileOpener.open( this.open, 'application/pdf')
// let options: InAppBrowserOptions = {
//   location: 'yes',
//   hideurlbar: 'yes',
//   hidenavigationbuttons: 'yes',
//   clearcache: 'no',
//   clearsessioncache: 'yes',
//   closebuttoncaption: 'Close',
//   zoom: 'no',
//   closebuttoncolor: '#888888',
//   height:"300px",
//   width:"200px"
// };



// RESULT_BROWSER.show();
//  html2pdf()
//  .set(opt)
// html2pdf().set(opt).from(element).topdf().get('pdf').then(pdf=>{
//   this.iab.create(pdf.output("bloburl"));

// })
// this.iab.create(this.open);
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




openggg(){

// var myBase64 = "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
// To define the type of the Blob
var contentType = "application/pdf";
// if cordova.file is not available use instead :
// var folderpath = "file:///storage/emulated/0/";

    var filename = "helloWorld.pdf";

    // savebase64AsPDF(folderpath,filename,$scope.PdfString,contentType);

function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}
    function savebase64AsPDF(folderpath,filename,content,contentType){
        // Convert the base64 string in a Blob
        // var DataBlob = b64toBlob(content,contentType);

        console.log("Starting to write the file :3");

     
    }

}

}
