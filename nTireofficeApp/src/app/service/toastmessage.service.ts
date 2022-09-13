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
  
      message: tittle,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
}
