import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-material-issue',
  templateUrl: './material-issue.page.html',
  styleUrls: ['./material-issue.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialIssuePage implements OnInit {
  showviewlist: boolean = false
  showedit: boolean = false
  data: any = [];

  @ViewChild('firstTable') myTable1: MaterialIssuePage;
  @ViewChild('secondTable') myTable2: MaterialIssuePage;


  row = [
    // {
    //   "branch": "india",
    //   "mode": "new",
    //   "mrscode": "3434234",
    //   "fromDate": "17-10-2022",
    //   "toDate": "17-12-2022",
    //   "status": "pending",
    //   "action":"edit"
    // },
    // {
    //   "branch": "india",
    //   "mode": "action",
    //   "mrscode": "3434234",
    //   "fromDate": "11-10-2022",
    //   "toDate": "17-12-2023",
    //   "status": "pending",
    //   "action":"edit"
     
    // }
  ];
  columns = [
    { name: 'Branch', width: "110" },
    { name: 'Mode', width: "120" },
    { name: 'Mrs Code', width: "120" },
    { name: 'From Date', width: "120" },
    { name: 'To Date', width: "120" },
    { name: 'Status', width: "110" },
    { name: 'Action', width: "110" }

  ];
  constructor(private modalCtrl: ModalController, private http: HttpClient, private tableApi: TableSampleService) { }

  ngOnInit() {
    this.data = [
      {
        "branch": "india",
        "mode": "new",
        "mrscode": "3434234",
        "fromDate": "17-10-2022",
        "toDate": "17-12-2022",
        "status": "pending",
        "action":"edit"

      },
      {
        "branch": "india",
        "mode": "action",
        "mrscode": "3434234",
        "fromDate": "11-10-2022",
        "toDate": "17-12-2023",
        "status": "pending",
        "action":"edit"

      }
    ]
  }
  Submit() {
    this.showviewlist = true
  }
  transCancel() {
    this.modalCtrl.dismiss();
  }

  edit() {
    this.showedit = true
  }


}
