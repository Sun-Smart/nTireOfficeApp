import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IpaddressService } from 'src/app/ipaddress.service';

@Component({
  selector: 'app-updatevendoritem',
  templateUrl: './updatevendoritem.page.html',
  styleUrls: ['./updatevendoritem.page.scss'],
  providers:[NavParams]
})
export class UpdatevendoritemPage implements OnInit {


  uom_resp:any;
  Vendors_Item_uom:any;
  @Input() documentnew:any;
  vendor_id:any;
  vendor_name:any;
  vendor_code:any;
  vendorid_res:any;
  Vendors_Item_List:any;
  Vendors_Item_List_res:any;

  constructor( private http: HttpClient, public Ipaddressservice: IpaddressService,private navParams: NavParams,public modalController: ModalController) {
    this.documentnew = this.navParams.data.data;
    console.log(this.documentnew);
   }

  ngOnInit() {
    this.getvendorid();
    this.vendoritemsview1();
  }

  ionViewDidEnter(){

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

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendors_uom/',obj).subscribe(res=>{
      console.log(res);
      this.uom_resp = res;

      this.Vendors_Item_uom =this.uom_resp.recordset;
    },err=>{
      console.log(err);
    })
  }

  updateVendorDetails(documentnew){
    console.log(documentnew);
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var Vendoritemupdate = {
      function_id: window.localStorage['FUNCTION_ID'],
      rowid: documentnew.rowid,
      VENDORCODE: '',
      item_id: documentnew.itemid,
      item_uom: documentnew.itemuom,
      vendor_item_code: documentnew.itemcode,
      from_qty: documentnew.fromqty,
      to_qty: documentnew.toqty,
      unit_price: documentnew.unitprice,
      discount: documentnew.discount,
      taxes_and_levies: documentnew.tax_levies,
      transport_charges: documentnew.transportchg,
      net_price_per_unit: documentnew.netprice,
      lead_time: documentnew.leadtime,
      remarks: documentnew.remarks,
      // quotation_ref: documentnew.quotationref,
      // quotation_date: documentnew.quotationdate,
      // validity: documentnew.validity,
      lst_upd_by: userid,
      lst_upd_on: '',
      ipaddress: '',
      tax2: documentnew.tax2,
      brand: documentnew.brand,
      model: documentnew.model,
      itemdesc: documentnew.itemdesc,
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']

    }
    console.log(Vendoritemupdate);
    if (Vendoritemupdate.taxes_and_levies == null) {
      Vendoritemupdate.taxes_and_levies = 0
    }
    if (Vendoritemupdate.unit_price == null) {
      Vendoritemupdate.unit_price = 0
    }
    if (Vendoritemupdate.discount == null) {
      Vendoritemupdate.discount = 0
    }
    if (Vendoritemupdate.transport_charges == null) {
      Vendoritemupdate.transport_charges = 0
    }
    if (Vendoritemupdate.net_price_per_unit == null) {
      Vendoritemupdate.net_price_per_unit = 0
    }

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'update_vendors_items/',Vendoritemupdate).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

  getvendorid(){
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var ven_obj = {
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token'],
      FUNCTION_ID:window.localStorage['FUNCTION_ID'],
      USERCODE:window.localStorage['TUM_USER_CODE'],
    }
    console.log(ven_obj);

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'get_vendorid/',ven_obj).subscribe(res=>{
      console.log(res);
      this.vendorid_res = res;
      window.localStorage['VENDOR_CODE'] = this.vendorid_res.recordset[0].Vendor_Code;
      window.localStorage['VENDOR_ID'] = this.vendorid_res.recordset[0].vendor_id;
      window.localStorage['Vendor_NAME'] = this.vendorid_res.recordset[0].Vendor_Name;
      this.vendor_id = window.localStorage['VENDOR_ID'];
      this.vendor_name = window.localStorage['Vendor_NAME']
      this.vendor_code = window.localStorage['VENDOR_CODE'];
    },err=>{
      console.log(err);
    })
  }

  vendoritemsview(){
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var vendorItems:any = {
      FUNCTION_ID: window.localStorage['FUNCTION_ID'],
      VENDORCODE: window.localStorage['VENDOR_CODE'],
      ITEMCODE: '',
      SORTEXPRESSION: 'item_uom',
      ALPHANAME: '',
      access_token: window.localStorage['token'],
      userid:  window.localStorage['TUM_USER_ID'],
      usertoken: window.localStorage['usertoken']
    }
    console.log(vendorItems);
    if (vendorItems.SUPPLIER_ID == undefined) {
      vendorItems.SUPPLIER_ID = '';
    }

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'list_vendors_items/',vendorItems).subscribe(res=>{
      console.log(res);
      this.Vendors_Item_List = this.Vendors_Item_List_res.recordset;

    },err=>{
      console.log(err);
    })
  }

  closemodal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }



}
