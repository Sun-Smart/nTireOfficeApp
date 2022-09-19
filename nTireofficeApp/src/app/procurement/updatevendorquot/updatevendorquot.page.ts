import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/ipaddress.service';

@Component({
  selector: 'app-updatevendorquot',
  templateUrl: './updatevendorquot.page.html',
  styleUrls: ['./updatevendorquot.page.scss'],
})
export class UpdatevendorquotPage implements OnInit {

  VendorQuot:any=[];
  releasedquot;
  newquot;
  constructor(private http: HttpClient, public Ipaddressservice: IpaddressService,) { }

  ngOnInit() {
  }

  netpricecalc(unitprice, qty, discount, tl, tc){
    console.log(unitprice, qty, discount, tl, tc);
    if (discount == undefined) {
      discount = 0;
    }
    if (tl == undefined) {
      tl = 0;
    }
    if (tc == undefined) {
      tc = 0;
    }
    var totalqtyprice = (unitprice * qty);
    // discount = Number(document.upquot.discount.value);
    var totprice = totalqtyprice - (totalqtyprice * discount / 100) + tc;
    this.VendorQuot.netprice = (totprice + totprice * tl / 100);
    // $scope.VendorQuot.netprice = totprice - (totprice * discount/100);


    console.log(this.VendorQuot.netprice);
  }

  updateVendorDetails(updquot){
    console.log(updquot);
    if (updquot.release == 1) {
      updquot.status = 'N'
    } else if (updquot.release == 0) {
      updquot.status = 'R'
    }

    if(updquot.tax_levies==undefined){
      updquot.tax_levies=null;
    }
     if(this.VendorQuot.tax2==undefined){
      this.VendorQuot.tax2=null;
    }
    if(this.VendorQuot.rev_no==undefined){
      this.VendorQuot.rev_no=null;
    }

    // var deldate = $filter('date')(updquot.deliverydate, 'dd/MM/yyyy');
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];
console.log(this.VendorQuot)
    var token = window.localStorage['token'];
    var Vendoritemupdate = {
      FUNCTION_ID: window.localStorage['FUNCTION_ID'],
      BRANCH_ID: window.localStorage['TUM_BRANCH_ID'],
      QUOTEID: this.VendorQuot.quote_id,
      ITEMID: this.VendorQuot.itemid,
      NETPRICE: updquot.netprice,
      VENDORID: this.VendorQuot.VENDOR_ID,
      QUANTITY: this.VendorQuot.qty,
      // ITEMDESCRIPTION: updquot.itemdesc,
      // ITEM_UOM: updquot.itemuom,
      // VENDOR_ITEM_CODE: updquot.itemcode,
      UNITPRICE: updquot.unitprice,
      DISCOUNT: updquot.discount,
      TAXLEVIES: updquot.tax_levies,
      TRANSPORTCHARGES: updquot.transportcharge,
      TAX2: this.VendorQuot.tax2,
      REVNO: this.VendorQuot.rev_no,
      REMARKS: updquot.remarks,
      DELIVERYBEFORE: updquot.deliverydate,
      STATUS: this.VendorQuot.status,
      CURRENCY: null,
      MARGIN: null,
      CREATED_BY: '',
      IPADDRESS: '',
      ROWID: '',
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }
    console.log(Vendoritemupdate);

    // console.log(deldate);
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'update_vendor_Quot/',Vendoritemupdate).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
