import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { PmsIssueStatusPage } from '../pms-issue-status/pms-issue-status.page';

@Component({
  selector: 'app-pmscustomer',
  templateUrl: './pmscustomer.page.html',
  styleUrls: ['./pmscustomer.page.scss'],
})
export class PmscustomerPage implements OnInit {

  name: string = '';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async createModal() {

    const model = await this.modalCtrl.create({

      component: PmsCreateIssuePage,
    });
   return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  }

 async viewModal(){
  const model = await this.modalCtrl.create({

    component: PmsIssueStatusPage,
  });
  return await model.present();
 }
  
 
}
