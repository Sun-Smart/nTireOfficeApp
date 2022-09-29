import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-additional-charges',
  templateUrl: './additional-charges.page.html',
  styleUrls: ['./additional-charges.page.scss'],
})
export class AdditionalChargesPage implements OnInit {
  visible:boolean=true;
  invisible:boolean=false;
 
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  submit(){
    this.visible=false;
    this.invisible=true
      }
      cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
      }
}
