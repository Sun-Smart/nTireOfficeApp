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
  responseDatalength: any;
  constructor(private alertController: AlertController, private httpclient: HttpClient, private Ipaddressservice: IpaddressService) { }

  ngOnInit() {
    this.Submit();

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
            this.getresponse = [];
            this.responseDatalength = ""

          }
        }
      ]
    });

    await alert.present();
  }


  Submit() {
    debugger
    console.log(this.rfqcode)
    console.log(this.status)
    console.log(this.fromdate)
    console.log(this.rfqcode)
    if (this.rfqcode == undefined) {
      this.rfqcode = "0"
    }
    if (this.status == undefined || this.status == "<< Select >>") {
      this.status = "0"
    }
    if (this.fromdate == undefined) {
      this.fromdate = "0"
    }
    if (this.todate == undefined) {
      this.todate = "0"
    }

    var body = {
      "FUNCTIONIDP": "1",
      "BRANCHIDP": "1",
      "RFQCODEP": this.rfqcode,
      "FROMDATEP": this.fromdate,
      "TODATEP": this.todate,
      "ITEMCODEP": "",
      "VENDORIDP": "",
      "QUOTEREFP": "",
      "STATUSP": this.status,
      "PAGEINDEXP": 0,
      "PAGESIZEP": 20,
      "SORTEXPRESSIONP": "item_id",
      "ALPHANAMEP": "",
      "modep": "2",
      "VENDORCODEP": ""
    };

    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_pending_quotation_search', body).subscribe((res: any) => {
      this.getresponse = res;
      this.responseDatalength = this.getresponse.length;

      for (let item of this.getresponse) {
        console.log(item);
      }
    })

  }

}
