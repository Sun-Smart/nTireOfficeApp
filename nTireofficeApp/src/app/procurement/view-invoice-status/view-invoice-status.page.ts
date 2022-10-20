import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  constructor(private alertController: AlertController) {
    this.dat_valid = {
      currentDate: new Date()
    };
  }

  ngOnInit() {
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
}
