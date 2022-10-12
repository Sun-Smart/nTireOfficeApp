import { Injectable } from '@angular/core';
import { AlertController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastmessageService {

  constructor(public alertController:AlertController) { }

  async presentAlert1(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

}
