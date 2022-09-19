import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-vendormaster-model',
  templateUrl: './vendormaster-model.page.html',
  styleUrls: ['./vendormaster-model.page.scss'],
})
// export class VendormasterModelPage implements OnInit {
  export class VendormasterModelPage{

  @Input() itemdata:any;

  constructor(public modalCtrl : ModalController, private navParams: NavParams) {
    this.itemdata = this.navParams.data.itemdata;
    console.log(this.itemdata);
  }
  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}

