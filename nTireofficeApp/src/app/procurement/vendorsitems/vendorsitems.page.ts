import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IpaddressService } from 'src/app/ipaddress.service';
import { UpdatevendoritemPage } from '../updatevendoritem/updatevendoritem.page';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-vendorsitems',
  templateUrl: './vendorsitems.page.html',
  styleUrls: ['./vendorsitems.page.scss'],
})
export class VendorsitemsPage implements OnInit {
  Vendors_Item_List_resp:any;
  Vendors_Item_List:any = [];
  documentnew:any = [];
  vendorscode:any;
  loading:boolean = false;
  vendormaster_resp:any;
  vendormaster:any;
  vendorcode:any;
  vendorcode_resp:any;
  constructor(private http: HttpClient, public Ipaddressservice: IpaddressService,public modalController: ModalController,) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.vendoritemsview1();
  }
  vendoritemsview1(){

    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];

    var obj = {
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'listvendor_items/',obj).subscribe(res=>{
      console.log(res);
      this.vendorcode_resp = res;

      this.vendorcode =this.vendorcode_resp.recordset;
      this.vendorcode.sort((a, b) => a.Vendor_Code.localeCompare(b.Vendor_Code))
      var vendor_codelist = [];
      for (var i = 0; i < this.vendorcode.length; i++) {
        vendor_codelist.push(this.vendorcode[i].Vendor_Code);
      }

      // $("#VendorCode").autocomplete({
      //   source: vendor_codelist,
      // });

    },err=>{
      console.log(err);
    })
  }
  getvendornames(event){
    console.log(event);
    if(event == ""){
      this.Vendors_Item_List = [];
      this.loading = false;
    }

  //  window.localStorage['VENDOR_CODE'] = item;
    this.vendoritemsview( event.item.Vendor_Code);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event);
  }
  vendoritemsview(item){

    this.loading = true;
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var vendorItems = {
      FUNCTION_ID: window.localStorage['FUNCTION_ID'],
      VENDORCODE:item,
      ITEMCODE: '',
      SORTEXPRESSION: 'item_uom',
      ALPHANAME: '',
      access_token: window.localStorage['token'],
      userid: userid,
      usertoken: usertoken

    }
    console.log(vendorItems);
    // if (vendorItems.SUPPLIER_ID == undefined) {
    //   vendorItems.SUPPLIER_ID = '';
    // }
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'list_vendors_items/',vendorItems).subscribe(res=>{
      console.log(res);
      this.loading = false;
      this.Vendors_Item_List_resp = res;
      this.Vendors_Item_List = this.Vendors_Item_List_resp.recordset;
    },err=>{
      this.loading = false;
      console.log(err);
    })
  }

  async updateVendors(item){

    this.documentnew.itemcode = item.VENDOR_ITEM_CODE;
    this.documentnew.itemid = item.item_id;
    this.documentnew.brand = item.Brand;
    this.documentnew.model = item.Model;
    this.documentnew.fromqty = item.frmqty;
    this.documentnew.toqty = item.toqty;
    this.documentnew.tax2 = item.Tax2;
    this.documentnew.itemuom = "" + item.ITEM_UOM;
    this.documentnew.uom = item.UOM;
    this.documentnew.unitprice = item.UNIT_PRICE;
    this.documentnew.itemdesc = item.ITEMDESCRIPTION;
    this.documentnew.discount = item.DISCOUNT;
    this.documentnew.tax_levies = item.TAXES_AND_LEVIES;
    this.documentnew.leadtime = item.LEAD_TIME;
    this.documentnew.transportchg = item.TRANSPORT_CHARGES;
    this.documentnew.netprice = item.NET_PRICE_PER_UNIT;
    this.documentnew.remarks = item.REMARKS;
    this.documentnew.rowid = item.ROWID;
    this.documentnew.validity = item.validity;
    this.documentnew.quotationdate = item.quotation_date;
    this.documentnew.quotationref = item.quotation_ref;

    console.log(this.documentnew);

    const modal = await this.modalController.create({
      component: UpdatevendoritemPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.documentnew
      }
    });
    return await modal.present();
  }

}
