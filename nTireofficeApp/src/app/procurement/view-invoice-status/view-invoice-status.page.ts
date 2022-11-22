import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
@Component({
  selector: 'app-view-invoice-status',
  templateUrl: './view-invoice-status.page.html',
  styleUrls: ['./view-invoice-status.page.scss'],
})
export class ViewInvoiceStatusPage implements OnInit {
  dat_valid;
  invoicenumber: any;
  invoiceDate: any;
  invoiceamount: any;
  invoiceremark: any;
  // upload: any;
  status: any;
  fromDate: any;
  Paymentref: any;
  branchID: string;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  invoiceget: any;
  poinvoive_no: any;
  poinvoicecode: any=[];
  isPropertycodeAvailable: boolean=false;
  ponumber: any;
  poid: any;
  showdata1: boolean=true;
  showdata: string;
  showcount: any;
  showcount1: boolean=false;
  verify: any;
  poidref: any;
  invoiceref: any;
  pdfpath: string;
  constructor(private alertController: AlertController, public Ipaddressservice: IpaddressService,  private http: HttpClient,) {
    this.dat_valid = {
      currentDate: new Date()
    };

    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getinvoice();
  }
  close() {

  }

  async clear() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.invoicenumber = "";
            this.invoiceDate = "";
            this.invoiceamount = "";
            this.invoiceremark = "";
            // this.upload = "";
            this.status = "";
            this.fromDate = "";
            this.Paymentref = "";
          }
        }
      ]
    });

    await alert.present();
  }


getinvoice(){
  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getinvoicedetails/' +  this.functionID + "/" +     this.branchID + "/" + 0, {
    headers: options,
  }).subscribe(resp => {
    this.invoiceget = resp;
    if(this.invoiceget==null||this.invoiceget==''){
      this.showdata="NO Record Found"
    }else {
      this.showdata="Total Count:" +" "+this.invoiceget.length
     
    }
   
  
 
  });
  
}




getinvoiceCode(e:any){


  this.poinvoicecode = [];
  if (e.target.value == "") {
    this.poinvoicecode = [];
    this.isPropertycodeAvailable = false;
  }
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

}




filterinvoicelist(){
  this.showdata1=false
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getinvoicedetails/' +  this.functionID + "/" +     this.branchID + "/" + this.poid, {
    headers: headers,
  }).subscribe(resp => {
    this.invoiceget = resp;
    if(this.invoiceget==null||this.invoiceget==''){
      this.showdata="NO Record Found"
    }else {
      this.showdata="Total Count:" +" "+this.invoiceget.length
     
    }
 
  });
}



getpdffile(item:any){
  console.log(item,"iteee");
  this.poidref=parseInt(item.PO_ID),
  this.invoiceref=parseInt(item.INVOICE_ID)
  
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'downloadinvoice/' +  this.poidref + "/" +     this.invoiceref , {
    headers: headers,responseType: 'text',
  }).subscribe(resp => {
    this.pdfpath=resp
    console.log(this.pdfpath);
    window.open(this.pdfpath, '_blank');
    

  })

}


}
