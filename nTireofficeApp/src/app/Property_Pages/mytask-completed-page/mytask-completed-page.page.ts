import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mytask-completed-page',
  templateUrl: './mytask-completed-page.page.html',
  styleUrls: ['./mytask-completed-page.page.scss'],
})
export class MytaskCompletedPagePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  };

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
