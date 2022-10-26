import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
// import { IpaddressService } from 'src/app/ipaddress.service';
// import { VendorpaymentsPage } from '../vendorpayments/vendorpayments.page';
import { Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';
@Component({
  selector: 'app-vendorpoconfirm',
  templateUrl: './vendorpoconfirm.page.html',
  styleUrls: ['./vendorpoconfirm.page.scss'],
})
export class VendorpoconfirmPage implements OnInit {


  vendorcode = window.localStorage['VENDOR_CODE'];
  branch_id = localStorage.getItem('TUM_BRANCH_ID');
  function_id = localStorage.getItem('FUNCTION_ID');
  usertypedesc = localStorage.getItem('TUM_USER_TYPE_DESC');
  userid = window.localStorage['TUM_USER_ID'];
  usertoken = window.localStorage['usertoken'];
  token = window.localStorage['token'];
  vendor_code: any;
  vendor_code_res: any;
  vendor_codelist: any = [];
  loading: boolean = false;
  PO_list: any = [];
  PO_list_res: any;
  Pocode: any;
  Pofunc_id: string;
  POID: any;
  Revision_id: any;
  Po_date: any;
  vendor_name: any;
  Statusval: any;
  vend_code: any;
  allbranch_res: any;
  allbranch: any;
  showfilter: boolean = true;
  fromDate: any;
  toDate: any;
  username: any;
  todate: any;
  fromdate: any;
  postatus: any;
  constructor(public modalController: ModalController, private router: Router, private http: HttpClient, public navCtrl: NavController, public Ipaddressservice: IpaddressService,) {
    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getallbranches();
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }
  getallbranches() {
    var obj = {
      userid: this.userid,
      usertoken: this.usertoken,
      access_token: window.localStorage['token']
    }
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'getAllBranches/', obj).subscribe(res => {
      console.log(res);
      let res1 = JSON.stringify(res)
      this.allbranch_res = res1;
      console.log(this.allbranch_res)

      this.allbranch = JSON.parse(this.allbranch_res);
      // this.allbranch = this.allbranch_res.recordset;
    }, err => {
      console.log(err);
    })
  }

  listvendoritems() {
    var obj = {
      userid: this.userid,
      usertoken: this.usertoken,
      access_token: window.localStorage['token']
    }

    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'listvendor_items/', obj).subscribe(res => {
      console.log(res);
      this.vendor_code = this.vendor_code_res.recordset;
      for (var i = 0; i < this.vendor_code.length; i++) {
        this.vendor_codelist.push(this.vendor_code[i].Vendor_Code);
      }
    }, err => {
      console.log(err);
    })
  }

  filterdate() { }

  searchpo(branch_id, ponum, vendor_code, postatus, fromdate, todate) {
    debugger
    this.loading = true;
    // if (fromdate == undefined) {
    //   var fromDate = '';
    // }
    // if (todate == undefined) {
    //  var toDate = '';
    // }
    // fromDate = $filter('date')(fromdate, 'dd/MM/yyyy');
    // $scope.toDate = $filter('date')(todate, 'dd/MM/yyyy');

    if (ponum == undefined) {
      ponum = '';
    }
    if (vendor_code == undefined) {
      vendor_code = '';
    }

    if (postatus == undefined) {
      postatus = '';
    }
    if ((vendor_code == '' || vendor_code == undefined) && this.usertypedesc == 'Vendor') {
      vendor_code = window.localStorage['VENDOR_CODE'];
    }
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var po_list = {
      functionid: "1",
      branchid: branch_id,
      FUNCTION_ID: window.localStorage['FUNCTION_ID'],
      // BRANCH_ID: branch_id,
      PONUMBER: ponum,
      VENDORCODE: vendor_code,
      FROMDATE: this.fromDate,
      TODATE: this.toDate,
      SORTEXPRESSION: 'po_reference',
      STATUS: postatus,
      ITEMCODE: '',
      userid: userid,
      usertype: window.localStorage['TUM_USER_TYPE'],
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }
    console.log(po_list);

    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'list_po_order/', po_list).subscribe(res => {
      console.log(res);
      this.PO_list_res = res;
      this.PO_list = this.PO_list_res.recordset;
      if (this.PO_list == undefined) {
        this.PO_list = [];
      }

    }, err => {
      console.log(err);
    })
  }

  confirmPo(item) {
    console.log(item.po_id);
    var function_id = localStorage.getItem('FUNCTION_ID');
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var po_confirm = {
      FUNCTION_ID: function_id,
      POID: item.po_id,
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token']
    }

    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'Confirm_poDetails/', po_confirm).subscribe(res => {
      console.log(res);
      this.navCtrl.navigateForward(['/vendorpayments'], {
        queryParams: item
      });

    }, err => {
      console.log(err);
    })
  }

  payPo(item) {
    console.log(item);
    this.disp_vendorid(item.vendor_code);

    var function_id = localStorage.getItem('FUNCTION_ID');
    var po_confirm = {
      FUNCTION_ID: function_id,
      POID: item.po_id,
      userid: this.userid,
      usertoken: this.usertoken,
      access_token: window.localStorage['token']
    }

    this.Pocode = item.po_reference;
    this.Pofunc_id = po_confirm.FUNCTION_ID;
    this.POID = po_confirm.POID;
    this.Revision_id = item.revision_no;
    this.Po_date = item.po_date;
    this.vendor_name = item.vendor_name;
    this.vendor_code = item.vendor_code;
    this.Statusval = item.StatusVal;
    // $state.go("app.vendorPayment");

  }
  disp_vendorid(vendor_code) {
    this.vend_code = vendor_code;
    var ven_obj = {
      userid: this.userid,
      usertoken: this.usertoken,
      access_token: window.localStorage['token'],
      code: this.vend_code
    }
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'dispvendorid/', ven_obj).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);
    })
  }
}
