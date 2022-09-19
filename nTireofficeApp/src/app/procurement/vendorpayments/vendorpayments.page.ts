import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { IpaddressService } from 'src/app/ipaddress.service';
import { InvoiceuploadPage } from '../invoiceupload/invoiceupload.page';

@Component({
  selector: 'app-vendorpayments',
  templateUrl: './vendorpayments.page.html',
  styleUrls: ['./vendorpayments.page.scss'],
})
export class VendorpaymentsPage implements OnInit {

  usertypechk = window.localStorage['TUM_USER_TYPE'];
  vendorusertype = true;
  poPayment:any;
  poPayment_res:any;
  requestedQTY:any;
  standardCost:any;
  tax:any;
  tranport:any;
  discount:any;
  cost:any;
  discount_value:any;
  value:any;
  net_value:any;
  tax_amount:any;
  net_price:any;
  podetails:any;
  vendor_name:any;
  vendor_code:any;
  Pocode:any;
  Po_date:any;
  poPaymentdata_res:any;
  poPaymentdata:any;
  poid:any;
  paymentid:any;
  pcremarks:any = '';
  approvalid:any;
  poPaymentaddress_res:any;
  poPaymentaddress:any;

  constructor(public modalController: ModalController,public activatedRoute : ActivatedRoute,public toastController: ToastController,public alertController:AlertController, private http: HttpClient, public Ipaddressservice: IpaddressService,) {
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
      this.podetails = res;
      this.vendor_name = this.podetails.vendor_name;
      this.vendor_code = this.podetails.vendor_code;
      this.Pocode = this.podetails.po_reference;
      this.Po_date = this.podetails.po_date;
      this.poid = this.podetails.po_id;
  });
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.viewvendorpayments();
    this.viewvendoraddress();
  }

  async openModal(item){
    const modal = await this.modalController.create({
      component: InvoiceuploadPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  viewvendorpayments(){

    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];
    var payment_obj = {
      FUNCTION_ID: window.localStorage.getItem('FUNCTION_ID'),
      POID: this.podetails.po_id,
      SORTEXPRESSION: 'item_description',
      ALPHANAME: '',
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }

    if(this.usertypechk==1){
      this.vendorusertype = false;
    }

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_payment/',payment_obj).subscribe(res=>{
      console.log(res);
      this.poPayment_res =res;
      this.poPayment = this.poPayment_res.recordset;

      for (let i = 0; i < this.poPayment.length; i++) {
        this.requestedQTY = this.poPayment[i].REQUIREDQTY;
        this.standardCost = this.poPayment[i].AMOUNT;
        this.tax = this.poPayment[i].LEVIES_DUTIES;
        this.tranport = this.poPayment[i].TRANSPORT_CHARGES;
        this.discount = this.poPayment[i].DISCOUNT;
        this.cost = this.requestedQTY * this.standardCost

        this.discount_value = this.cost * this.discount / 100

        this.value = this.cost - this.discount_value;

        this.net_value = this.value + this.tranport;

        this.tax_amount = this.net_value * this.tax / 100;

        this.net_price = this.net_value + this.tax_amount;
        console.log(this.net_price);
       this.poPayment[i].Net_Amount=this.net_price;
       console.log(this.poPayment);
      }

    },err=>{
      console.log(err);
    })



    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_paymentdata/',payment_obj).subscribe(res=>{
      console.log(res);
      this.poPaymentdata_res =res;
      this.poPaymentdata = this.poPaymentdata_res.recordset;
      this.paymentid = this.poPaymentdata[0].PaymentId;
      this.approvalid = this.poPaymentdata[0].Approval_id;
    },err=>{
      console.log(err);
    })


  }

  viewvendoraddress(){

    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var payment_obj = {
      POID: this.podetails.po_id,
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_payment_address/',payment_obj).subscribe(res=>{
      console.log(res);
      this.poPaymentaddress_res =res;
      this.poPaymentaddress = this.poPaymentaddress_res.recordset;
    },err=>{
      console.log(err);
    })
  }

  async confirmpayment(value){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Remarks!',
      inputs: [
        {
          name: 'payment_remarks',
          type: 'text',
          placeholder: 'Type Remarks..'
        }
      ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              this.pcremarks = data.payment_remarks;
              var userid = window.localStorage['TUM_USER_ID'];

              var usertoken = window.localStorage['usertoken'];

              var payment_obj = {
                FUNCTION_ID: Number(window.localStorage.getItem('FUNCTION_ID')),
                BRANCH_ID: Number(window.localStorage.getItem('TUM_BRANCH_ID')),
                PO_ID: Number(this.podetails.po_id),
                REV_NO:Number(this.podetails.revision_no),
                PMT_ID:(this.paymentid),
                PO_NO:this.podetails.po_reference,
                APPROVALID: (this.approvalid),
                IPADDRESS:'',
                PCREMARKS:this.pcremarks,
                userid: userid,
                usertoken: usertoken,
                access_token: window.localStorage['token']
              }

              this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_payment_confirm/',payment_obj).subscribe(res=>{
                console.log(res);

              },err=>{
                console.log(err);
                if(err.error.text=="update success"){
                  this.toast("Payment Confirmed!");
                  this.viewvendorpayments();
                }
              })
            }
          }
        ]
      });

      await alert.present();
  }

  async toast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}
