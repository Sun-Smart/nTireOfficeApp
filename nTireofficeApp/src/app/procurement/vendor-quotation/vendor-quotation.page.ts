import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';
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
  // data: any=[];
  sub;
  data;
  rfqid;
  rfqcode;
  quoref;
  quoDate;
  statusvalue;
  Unitprice;
  Qty;
  prsId;
  ExpDate;
  itemCode;
  UpdateVendor;
  splitted;
  constructor( private router: Router,private activatedRoute: ActivatedRoute, public Ipaddressservice: IpaddressService,private modalCtrl: ModalController, private http:HttpClient, private tableApi : TableSampleService) { 

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
      this.rfqid = this.data.RFQID;
      this.rfqcode = this.data.RFQCODE;
      this.quoref = this.data.QUOTE_REF;
      this.quoDate = this.data.QUOTE_DATE;
      this.statusvalue = this.data.STATUSVAL;
      this.Unitprice = this.data.UNIT_PRICE;
      this.Qty = this.data.QUANTITY;
      this.prsId = this.data.PRSID;
      this.ExpDate = this.data.EXPECTEDDATE;
      this.itemCode = this.data.item_Code;
      var str = this.data.item_Code;
      console.log(str)
      this.splitted = str.split('~');
      console.log(this.splitted);
      this.splitted = this.splitted[0];
      console.log('new', this.splitted)

    });

  }

  ngOnInit() {
   
  }

  transCancel(){
    this.modalCtrl.dismiss();
  }

  edit(){
    this.showedit=true
  }
  updatevendorquot(prs:any,itemcode:any){
    console.log(prs,itemcode)
    // https://demo.herbie.ai/nTireMobileCoreAPI/api/ERP/get_Quotation_Items/16094/ITEM9
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_Quotation_Items/' + prs + '/' + itemcode).subscribe((res: any) => {
     this.UpdateVendor = res;
    })
    this.router.navigate(['/updatevendorquot'])
  }
}
