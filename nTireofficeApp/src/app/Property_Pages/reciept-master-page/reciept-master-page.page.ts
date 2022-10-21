import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdditionalChargesPage } from '../additional-page/additional-charges/additional-charges.page';

@Component({
  selector: 'app-reciept-master-page',
  templateUrl: './reciept-master-page.page.html',
  styleUrls: ['./reciept-master-page.page.scss'],
})
export class RecieptMasterPagePage implements OnInit {



  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async additionalCharge(){

    const model = await this.modalCtrl.create({

      component: AdditionalChargesPage,
    });
   return await model.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
