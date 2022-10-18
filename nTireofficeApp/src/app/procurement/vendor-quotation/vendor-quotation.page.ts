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
  showedit:boolean=false
  options = { checkboxes: true }
  data: any=[];
  // columns: any = [];
  // rows: any



  rows = [
    // { 'category': 'Escape Room', 'qty': '13', 'upprice': '12', 'disc': 'computer',
    //  'tax1': '876576578', 'tax2': '654678', 'tc' :'50053' ,'basev' :'765788' ,'bidv' :'87688' ,'expdate' :'10/08/1992',
    //  'delivarydate': '12/02/2020', 'action':'yes' },
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' },

     {
          "category": "Escape Room",
          "qty": 12,
          "upprice": 12,
          "disc": "computer",
          "tax1": 876576578,
          "tax2": 654678,
          "tc": 50053,
          "basev": 764578457,
          "bidv": 5847654,
          "expdate": "12/09/2022",
          "delivarydate": "12/09/2022",
          "action":"edit"
      },
      {
        "category": "Escape Room",
        "qty": 12,
        "upprice": 43,
        "disc": "personal computer",
        "tax1": 876576578,
        "tax2": 654678,
        "tc": 672743,
        "basev": 3434343,
        "bidv": 878887,
        "expdate": "12/09/2022",
        "delivarydate": "12/09/2022",
        "action":"edit"
    }
  ];
  columns = [
    { name: 'Category', width: "110"  },
      { name: 'QTY', width: "120"  },
      { name: 'Unit Price', width: "120"  },
      { name: 'disc%', width: "120"  },
      { name: 'tax1', width: "120"  },
      { name: 'tax2', width: "110"  },
      { name: 'Tc', width: "110"  },
      { name: 'BaseV', width: "120"  },
      { name: 'BidV', width: "120"  },
      { name: 'ExpDate', width: "120"  },
      { name: 'DelivaryDate', width: "120"  },
      { name: 'Action', width: "120"  },
  ];
  constructor(private modalCtrl: ModalController, private http:HttpClient, private tableApi : TableSampleService) { }

  ngOnInit() {
    this.data= [
      {
          "category": "Escape Room",
          "qty": 12,
          "upprice": 12,
          "disc": "computer",
          "tax1": 876576578,
          "tax2": 654678,
          "tc": 50053,
          "basev": 764578457,
          "bidv": 5847654,
          "expdate": "12/09/2022",
          "delivarydate": "12/09/2022",
          "action":"edit"
      },
      {
        "category": "Escape Room",
        "qty": 12,
        "upprice": 43,
        "disc": "personal computer",
        "tax1": 876576578,
        "tax2": 654678,
        "tc": 672743,
        "basev": 3434343,
        "bidv": 878887,
        "expdate": "12/09/2022",
        "delivarydate": "12/09/2022",
        "action":"edit"
    }
    ]
    // console.log(this.data)

    // this.data = this.tableApi.getData();
  // console.log(this.data)
  }

  transCancel(){
    this.modalCtrl.dismiss();
  }

  edit(){
    this.showedit=true
  }
}
