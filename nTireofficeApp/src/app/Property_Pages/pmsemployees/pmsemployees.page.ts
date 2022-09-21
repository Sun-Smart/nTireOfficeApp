import { Component, OnInit,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AdditionalChargesPage } from './additional-charges/additional-charges.page';
@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.page.html',
  styleUrls: ['./pmsemployees.page.scss'],
})
export class PmsemployeesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  // @ViewChild(IonModal) modal1: IonModal;
  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  canceled() {
    debugger
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
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



}
