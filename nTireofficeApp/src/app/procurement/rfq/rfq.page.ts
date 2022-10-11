import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.page.html',
  styleUrls: ['./rfq.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RFQPage implements OnInit {
  showviewlist:boolean=false;
  showrfq:boolean=false;

  options = { checkboxes: true }
  data: any = [];
  columnsStatus: any = [];

  constructor(private router :Router, private tableApi:TableSampleService) { 

    this.columnsStatus = [
      { name: 'prscode', width: "80" },
      { name: 'itemcode', width: "90"  },
      { name: 'requisitiondate',  },
      { name: 'status', width: "70"   },
    ];
  }

  ngOnInit() {

    this.data = this.tableApi.getDashbTable1();
    console.log(this.data);

  }
  Submit(){
    this.showviewlist=true
  }
  raiseRFQ(){
    this.showrfq=true
    this.showviewlist=false
  }
  manageRFQlink(){
    this.router.navigate(['/manage-rfq'])
  }
  onCheckboxClick(selectCheckBoxArr) { 
    alert(JSON.stringify(selectCheckBoxArr));
}
}
