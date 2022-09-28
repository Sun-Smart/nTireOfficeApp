import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from '../table-sample.service';


// export interface Data {
//   movies: string;
// }

@Component({
  selector: 'app-pms-transaction',
  templateUrl: './pms-transaction.page.html',
  styleUrls: ['./pms-transaction.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PmsTransactionPage implements OnInit {

  options = {checkboxes:true}
  data :any;
  columns: any = [];
  rows : any

  constructor(private modalCtrl: ModalController, private http:HttpClient, private tableApi : TableSampleService) { 

    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' },
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
 
