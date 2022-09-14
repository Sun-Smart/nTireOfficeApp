import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';

@Component({
  selector: 'app-pmscustomer',
  templateUrl: './pmscustomer.page.html',
  styleUrls: ['./pmscustomer.page.scss'],
})
export class PmscustomerPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async openModal() {
   
    const model = await this.modalCtrl.create({
      
      component: PmsCreateIssuePage,
    });
    model.present();
  }
}
