import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';
// import { TableSampleService } from '../table-sample.service';
@Component({
  selector: 'app-vendor-quotation',
  templateUrl: './vendor-quotation.page.html',
  styleUrls: ['./vendor-quotation.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VendorQuotationPage implements OnInit {

  options = { checkboxes: true }
  data: any = [];
  columns: any = [];
  rows: any

  constructor(private modalCtrl: ModalController, private http:HttpClient, private tableApi : TableSampleService) {

    this.columns = [
      { name: 'Category', width: "110"  },
      { name: 'QTY', width: "120"  },
      { name: 'UpPrice', width: "110"  },
      { name: 'disc%', width: "110"  },
      { name: 'tax1', width: "120"  },
      { name: 'tax2', width: "110"  },
      { name: 'Tc', width: "110"  },
      { name: 'Base V', width: "120"  },
      { name: 'Bid V', width: "110"  },
      { name: 'Exp Date', width: "110"  },
      { name: 'Delivary Date', width: "120"  },
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
