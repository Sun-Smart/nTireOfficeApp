import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from '../table-sample.service';

@Component({
  selector: 'app-pms-transaction',
  templateUrl: './pms-transaction.page.html',
  styleUrls: ['./pms-transaction.page.scss'],
  encapsulation: ViewEncapsulation.None
})



export class PmsTransactionPage implements OnInit {

  options = { checkboxes: true }
  data: any = [];
  columns: any = [];
  rows: any

  constructor(private modalCtrl: ModalController, private http:HttpClient, private tableApi : TableSampleService) {

    this.columns = [
      { name: 'Name', width: "110"  },
      { name: 'Company', width: "120"  },
      { name: 'Genre', width: "110"  },
    ];
   }

  ngOnInit() {

    this.data = this.tableApi.getData();
  console.log(this.data)
  }

  transCancel(){
    this.modalCtrl.dismiss();
  }
}
