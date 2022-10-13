import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reciept-master-page',
  templateUrl: './reciept-master-page.page.html',
  styleUrls: ['./reciept-master-page.page.scss'],
})
export class RecieptMasterPagePage implements OnInit {



  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
