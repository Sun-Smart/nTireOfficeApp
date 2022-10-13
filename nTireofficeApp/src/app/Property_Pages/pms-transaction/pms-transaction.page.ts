import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from '../table-sample.service';
import { RecieptMasterPagePage } from '../reciept-master-page/reciept-master-page.page';

@Component({
  selector: 'app-pms-transaction',
  templateUrl: './pms-transaction.page.html',
  styleUrls: ['./pms-transaction.page.scss'],
  encapsulation: ViewEncapsulation.None
})



export class PmsTransactionPage implements OnInit {

  @ViewChild('rowDetailTpl', { static: true }) rowDetailTpl: TemplateRef<any>;

  options = { checkboxes: true }
  data: any = [];
  columns: any = [];
  rows: any;

  optionsWithRowDetail = {}
  dataWithRowDetail = [];
  columnsWithRowDetail: any = [];
  showfilter: boolean = true;

  constructor(private modalCtrl: ModalController, private http: HttpClient, private tableApi: TableSampleService) {

    this.columns = [
      { name: 'Name', width: "110", sorting: true },
      { name: 'Company', width: "120" },
      { name: 'Genre', width: "110" },
    ];

    this.optionsWithRowDetail = {
      checkboxes: true,
      rowDetailTemplate: this.rowDetailTpl
    }

  }

  ngOnInit() {
    this.dataWithRowDetail = this.tableApi.getData();
    console.log(this.data)
    this.columnsWithRowDetail = [
      { name: 'Name', width: "110", sorting: true },
      { name: 'Company', width: "120" },
      { name: 'Genre', width: "110" },
    ];
  }

  async transCancel() {
  await  this.modalCtrl.dismiss('','');
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  async viewReciept() {
    debugger;

    const model = await this.modalCtrl.create({

      component: RecieptMasterPagePage,
    });
    return await model.present();
  }
}
