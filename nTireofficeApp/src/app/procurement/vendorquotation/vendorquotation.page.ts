import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-vendorquotation',
  templateUrl: './vendorquotation.page.html',
  styleUrls: ['./vendorquotation.page.scss'],
})
export class VendorquotationPage implements OnInit {

  vendorquotdropdown = true;
  usertypechk = window.localStorage['TUM_USER_TYPE'];
  vendorItemcode='';
  vendor_id:any;
  RFQID:any;
  releasedquot:any;
  newquot:any;
  itemcode;
  Vendors_quatation_detail:any;
  Vendors_quatation_detail_res:any;
  Vendors_Item_List_res:any;
  Vendors_Item_List:any = [];
  vendor_name:any;
  vendor_code:any;

  constructor(private http: HttpClient, public Ipaddressservice: IpaddressService,) {

  }

  ngOnInit() {
  }

  checkvendors(itemcode){
    if (this.usertypechk == 1) {
      // alert('hi')
      this.vendorquotdropdown = false;
      var userid = window.localStorage['TUM_USER_ID'];
      var usertoken = window.localStorage['usertoken'];
      var token = window.localStorage['token'];

      var obj = {
        userid: userid,
        usertoken: usertoken,
        access_token: window.localStorage['token'],
        ITEMCODE: itemcode
      }


      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'getitemlist/',obj).subscribe(res=>{
        console.log(res);

        // this.itemlist = response.data.recordset;
        // this.item_codelist = [];
        // for (var i = 0; i < this.itemlist.length; i++) {
        //   this.item_codelist.push(this.itemlist[i].item_Code);
        // }
      },err=>{
        console.log(err);
      })

    } else {
      this.vendoritemsview(itemcode);
    }
  }

  getvendornames(item){

    console.log(item);
    if ((item == null) ||(item ==undefined)) {
      window.localStorage['ITEM_CODE'] = '';

    } else {
      window.localStorage['ITEM_CODE'] = item;
      this.vendoritemsview(item);

    }
  }

    showmore(){
    }

    showless(){
    }

    vendoritemsview(itemcode){
      this.vendorItemcode = localStorage.getItem("ITEM_CODE");
      var userid = window.localStorage['TUM_USER_ID'];
      var usertoken = window.localStorage['usertoken'];
      var token = window.localStorage['token'];

      var ven_obj = {
        FUNCTIONID: window.localStorage['FUNCTION_ID'],
        BRANCHID: window.localStorage['TUM_BRANCH_ID'],
        userid: userid,
        usertoken: usertoken,
        access_token: window.localStorage['token'],
        ITEMCODE: itemcode
      }
      console.log(ven_obj);

      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendors_quotations/',ven_obj).subscribe(res=>{
        console.log(res);
        this.Vendors_Item_List_res = res;

        this.Vendors_Item_List = this.Vendors_Item_List_res.recordset;
        console.log(this.Vendors_Item_List);

        // this.vendor_name = this.Vendors_Item_List[0].VENDOR_NAME;
        // this.vendor_code = this.Vendors_Item_List[0].vendor_code;
      },err=>{
        console.log(err);
      })
    }

    updateVendorsQuot(item){
      console.log(item);
      var VendorQuot:any = [];


      VendorQuot.status = item.STATUS;

      // VendorQuot.BidVal = $rootScopeBidVal;
      VendorQuot.quote_ref = item.QUOTE_REF;
      VendorQuot.quote_id = item.QUOTE_ID;
      VendorQuot.rfqcode = item.RFQCODE;
      VendorQuot.itemcode = item.item_Code;
      VendorQuot.qty = item.QUANTITY;
      VendorQuot.unitprice = item.UNIT_PRICE;
      VendorQuot.itemdesc = item.item_short_Desc;
      VendorQuot.remarks = item.remarks;
      VendorQuot.quotedate = item.quotedate;
      VendorQuot.VENDOR_ID = item.VENDOR_ID;
      this.vendor_id = item.VENDOR_ID;
      VendorQuot.itemid = item.ITEM_ID;
      // vendor_id = item.VENDOR_ID;
      this.RFQID = item.VENDOR_ID;
      console.log(this.vendor_id,VendorQuot);
      var ven_obj = {
        FUNCTIONID: window.localStorage['FUNCTION_ID'],
        STRVENDORID: this.vendor_id,
        STRQUOTEREF: VendorQuot.quote_id,
        STRENID: this.RFQID,
        userid: window.localStorage['TUM_USER_ID'],
        usertoken: window.localStorage['usertoken'],
        access_token: window.localStorage['token'],
        ITEMCODE:  VendorQuot.itemcode
      }
      console.log(ven_obj);


      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'quotations_updatelist/',ven_obj).subscribe(res=>{
        console.log(res);

        this.Vendors_quatation_detail_res = res;
        console.log(this.Vendors_quatation_detail);
        VendorQuot.deliverydate = this.Vendors_quatation_detail[0].DELIVERY_BEFORE;
        // var deliverydate = $filter('date')(VendorQuot.deliverydate, 'MM/dd/yyyy');
        // var res = deliverydate.split("/");
        console.log(res[0], res[1], res[2])
        VendorQuot.deliverydate = new Date(res[2], res[1] - 1, res[0])
        VendorQuot.releasedate = this.Vendors_quatation_detail[0].EXP_DATE;
        //  var releasedate = $filter('date')(VendorQuot.releasedate, 'MM/dd/yyyy');
        // var res = releasedate.split("/");
        console.log(res[0], res[1], res[2])
        VendorQuot.releasedate = new Date(res[2], res[1] - 1, res[0])
        VendorQuot.expdate = this.Vendors_quatation_detail[0].EXP_DATE;
        VendorQuot.netprice = this.Vendors_quatation_detail[0].NET_PRICE_PER_UNIT;
        VendorQuot.discount = this.Vendors_quatation_detail[0].discount;
        VendorQuot.uomtext = this.Vendors_quatation_detail[0].UOMTEXT;
        VendorQuot.tax1 = this.Vendors_quatation_detail[0].Tax1;
        VendorQuot.tax2 = this.Vendors_quatation_detail[0].tax2;
        VendorQuot.transportcharge = this.Vendors_quatation_detail[0].TransportCharges;
        VendorQuot.rev_no = this.Vendors_quatation_detail[0].REV_NO;
      },err=>{
        console.log(err);
      })

      if (VendorQuot.status == 'N') {
        VendorQuot.release = 1;
        this.releasedquot = false;
        this.newquot = true;
      } else if (VendorQuot.status == 'R') {
        VendorQuot.release = 0;
        this.releasedquot = true;
        this.newquot = false;
      } else {

      }
      console.log(VendorQuot);

      // $state.go("app.vendorsQuotUpdate")
      // this.show();
    }
}

