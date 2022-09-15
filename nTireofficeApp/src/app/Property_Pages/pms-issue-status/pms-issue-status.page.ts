import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pms-issue-status',
  templateUrl: './pms-issue-status.page.html',
  styleUrls: ['./pms-issue-status.page.scss'],
})
export class PmsIssueStatusPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
