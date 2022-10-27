import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { AdditionalChargesPage } from './additional-charges/additional-charges.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-additional-page',
  templateUrl: './additional-page.page.html',
  styleUrls: ['./additional-page.page.scss'],
})
export class AdditionalPagePage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string;
  showfilter: boolean = true;
  branchlist1: Object;

  constructor(private modalCtrl: ModalController,private route:Router, private http: HttpClient, ) { }

  ngOnInit() {
this.BranchLocationdata();


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

async newIssueCreate(){
  const model = await this.modalCtrl.create({
    component : PmsCreateIssuePage,
  });
  return await model.present();
}

togglefilter() {
  this.showfilter = !this.showfilter;
};




BranchLocationdata() {

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getbranchid' , {
    headers: options,
  }).subscribe(resp => {
    this.branchlist1 = resp;
    console.log("brachdrop",this.branchlist1);
    
    // this.branchlist1 = JSON.parse(this.branchlist1);
    // console.log("branchlist1 one: " + JSON.stringify(this.branchlist1));

  }, error => {

    console.log("branchlist1 : " + JSON.stringify(error));
  });
}



}
