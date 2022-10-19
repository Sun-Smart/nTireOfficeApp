import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vendorpending-quotations',
  templateUrl: './vendorpending-quotations.page.html',
  styleUrls: ['./vendorpending-quotations.page.scss'],
})
export class VendorpendingQuotationsPage implements OnInit {
  rfocode:any;
  fromdate:any;
  todate:any;
  status:any;
  Quotation:any;
  constructor(private alertController: AlertController) { }

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

            this.rfocode = "";
            this.fromdate = "";
            this.todate = "";
            this.status = "";
            this.Quotation="";
          }
        }
      ]
    });

    await alert.present();
  }

}
