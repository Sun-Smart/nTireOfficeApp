import { Component, OnInit,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AdditionalChargesPage } from '../additional-page/additional-charges/additional-charges.page';
import { Router } from '@angular/router';
import { PmsTransactionPage } from '../pms-transaction/pms-transaction.page';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.page.html',
  styleUrls: ['./pmsemployees.page.scss'],
})
export class PmsemployeesPage implements OnInit {


  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string;


  constructor(private modalCtrl: ModalController,private route:Router) { }

  ngOnInit() {
  }

  taskCancel() {

    this.modalCtrl.dismiss();
  };

  Addcancel() {
    this.modalCtrl.dismiss();

    // this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  async createModal() {

    const model = await this.modalCtrl.create({

      component: AdditionalChargesPage,
    });
   return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  }

async newIssueCreate(){
  const model = await this.modalCtrl.create({
    component : PmsCreateIssuePage,
  });
  return await model.present();
}


}
