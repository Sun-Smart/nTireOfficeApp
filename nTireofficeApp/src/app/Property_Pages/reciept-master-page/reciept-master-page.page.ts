/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdditionalChargesPage } from '../additional-page/additional-charges/additional-charges.page';
import { PaymentHistoryPage } from '../payment-history/payment-history.page';

@Component({
  selector: 'app-reciept-master-page',
  templateUrl: './reciept-master-page.page.html',
  styleUrls: ['./reciept-master-page.page.scss'],
})
export class RecieptMasterPagePage implements OnInit {
  showDetails: boolean;
  data: any;
  sub: any;



  constructor(private router: Router, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
    });
    console.log(this.data);
  }

  async additionalCharge() {

    const model = await this.modalCtrl.create({

      component: AdditionalChargesPage,
    });
    return await model.present();
  }
  async paymentHistory() {

    const model = await this.modalCtrl.create({

      component: PaymentHistoryPage,
    });
    return await model.present();
  }

  cancel() {
    this.router.navigate(['/pms-transaction']);
    // return this.modalCtrl.dismiss(null, 'cancel');
  }
  receiptDetails() {
    this.showDetails = !this.showDetails;
  }
}
