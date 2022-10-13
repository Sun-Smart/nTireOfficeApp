import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { AdditionalChargesPage } from './additional-charges/additional-charges.page';

@Component({
  selector: 'app-additional-page',
  templateUrl: './additional-page.page.html',
  styleUrls: ['./additional-page.page.scss'],
})
export class AdditionalPagePage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string;

  constructor(private modalCtrl: ModalController,private route:Router) { }

  ngOnInit() {
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
