import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-vendorpending-quotations',
  templateUrl: './vendorpending-quotations.page.html',
  styleUrls: ['./vendorpending-quotations.page.scss'],
})
export class VendorpendingQuotationsPage implements OnInit {
  rfqcode: any;
  fromdate: any;
  todate: any;
  status: any;
  Quotation: any;
  getresponse: any;
  constructor(private alertController: AlertController, private httpclient: HttpClient, private Ipaddressservice: IpaddressService) { }

  ngOnInit() {


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
            this.rfqcode = "";
            this.fromdate = "";
            this.todate = "";
            this.status = "";
            this.Quotation = "";
          }
        }
      ]
    });

    await alert.present();
  }


  Submit() {

    if (this.rfqcode = undefined) {
      this.rfqcode = 0
    }
    if (this.status = undefined) {
      this.status = 0
    }
    if (this.fromdate = undefined) {
      this.fromdate = 0
    }
    if (this.rfqcode = undefined) {
      this.rfqcode = 0
    }

    var body = {
      "FUNCTIONIDP": "1",
      "BRANCHIDP": "1",
      "RFQCODEP": this.rfqcode,
      "FROMDATEP": this.fromdate,
      "TODATEP": this.todate,
      "ITEMCODEP": "",
      "VENDORIDP": "",
      "STATUSP": this.status,
      "PAGEINDEXP": 0,
      "PAGESIZEP": 0,
      "SORTEXPRESSIONP": "",
      "ALPHANAMEP": "",
      "modep": ""
    };

    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_pending_quotation_search', body).subscribe((res: any) => {
      this.getresponse = res;
      console.log("Response", res)
      console.log("Response", res)
      for (let item of this.getresponse) {
        console.log(item);
      }
    })

  }

}
