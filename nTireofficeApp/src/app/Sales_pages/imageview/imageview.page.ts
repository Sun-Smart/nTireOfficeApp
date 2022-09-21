/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.page.html',
  styleUrls: ['./imageview.page.scss'],
})
export class ImageviewPage implements OnInit {
  item:any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  commonapi_sales:any;
  constructor(navParams: NavParams,private model:ModalController) {
    this.item=navParams.get('item');
    this.commonapi_sales = 'https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/';
  }

  ngOnInit() {

  }
  closemodel(){
    this.model.dismiss();
  }
}
