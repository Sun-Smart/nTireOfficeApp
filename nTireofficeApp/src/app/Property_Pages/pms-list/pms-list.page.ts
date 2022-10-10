import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pms-list',
  templateUrl: './pms-list.page.html',
  styleUrls: ['./pms-list.page.scss'],
})
export class PmsListPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
}
