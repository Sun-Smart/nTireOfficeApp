import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
// import { IpaddressService } from 'src/app/ipaddress.service';
// import { VendorpaymentsPage } from '../vendorpayments/vendorpayments.page';
import { Router } from '@angular/router';
import { IpaddressService } from '../../service/ipaddress.service';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vendorpoconfirm',
  templateUrl: './vendorpoconfirm.page.html',
  styleUrls: ['./vendorpoconfirm.page.scss'],
})
export class VendorpoconfirmPage implements OnInit {
  public poconform = new FormGroup({
    // invoicenumber: new FormControl('', Validators.compose([Validators.required])),
    branch: new FormControl(''),
    vendorcode: new FormControl(''),
    ponum: new FormControl(''),
    Status: new FormControl(''),
    fromdate: new FormControl(''),
    todate: new FormControl(''),
   
  });

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
  polength: any;
  showdata: any;
  showdata1: boolean=true;
  isPropertycodeAvailable: boolean;
  conformvendorcode: any[];
  vendorres: any;
  vendornum: any;
  from: string;
  to: string;
  poinvoicecode: any[];
  poinvoive_no: any;
  branchID: string;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  poid: any;
  ponumber: any;
  isPocodeAvailable: boolean;
  constructor(public modalController: ModalController, private router: Router, private http: HttpClient, public navCtrl: NavController, public Ipaddressservice: IpaddressService,public datepipe: DatePipe) {
    this.username = localStorage.getItem('TUM_USER_NAME');
    
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
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

    // this.fromdate = this.datepipe.transform(this.fromdate, 'dd-MM-yyyy');
    // this.todate = this.datepipe.transform(this.todate, 'dd-MM-yyyy');


this.from=this.poconform.value.fromdate
this.to=this.poconform.value.todate

this.from= this.datepipe.transform(this.fromdate, 'dd-MM-yyyy');
this.to = this.datepipe.transform(this.to, 'dd-MM-yyyy');
console.log( this.from);

    var po_list = {
      functionid: "1",
      branchid: branch_id,
      FUNCTION_ID: window.localStorage['FUNCTION_ID'],
      // BRANCH_ID: branch_id,
      PONUMBER: this.ponumber||"",
      VENDORCODE: this.poconform.value.vendorcode ||null,
      FROMDATE:  this.from,
      TODATE:  this.to,
      SORTEXPRESSION: 'po_reference',
      STATUS: this.poconform.value.Status,
      ITEMCODE: '',
      userid: userid,
      alphaname:"",
      usertype: window.localStorage['TUM_USER_TYPE'],
      usertoken: usertoken,
      access_token: window.localStorage['token'],
      
    }
    console.log(po_list);

    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceerpapi + 'list_po_order/', po_list).subscribe(res => {
      console.log(res);
      this.PO_list_res = res;
      if(this.PO_list_res==null||this.PO_list_res==''){
        this.showdata="NO Record Found"
      }else {
        this.showdata="Total Count:" +" "+this.PO_list_res.length
       
      }

      console.log(  this.PO_list_res,"polist");
      
      this.PO_list = this.PO_list_res.recordset;
      console.log( this.PO_list );
      
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
      "functionid": function_id,
      "poid": item.po_id,
      // userid: userid,
      // usertoken: usertoken,
      // access_token: window.localStorage['token']
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





  getVendorCode(e:any){


    this.conformvendorcode = [];
    if (e.target.value == "") {
      this.conformvendorcode = [];
      this.isPropertycodeAvailable = false;
    }
    // const header = new Headers();
    // header.append("Content-Type", "application/json");
     let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getvendorcode' + "/" + e.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.conformvendorcode = [];
      this.isPropertycodeAvailable = false;
  
  this.vendorres=resp
  console.log(this.vendorres);
  
  for (var i = 0; i < this.vendorres.length; i++) {
    this.conformvendorcode.push({
      VENDOR_CODE: this.vendorres[i].VENDOR_CODE,
        
    });
  };
  
  const val = e.target.value;
  if (val && val.trim() != '') {
    this.isPropertycodeAvailable = true;
    this.conformvendorcode = this.conformvendorcode.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }
  
    })
  }
  
  
  
  
  
  
  addvendornumbercode(item:any){
    console.log(item,"item");

  this.vendornum=item.VENDOR_CODE;
    this.isPropertycodeAvailable = false;
  
  }



  

getinvoiceCode(e:any){


  this.poinvoicecode = [];
  if (e.target.value == "") {
    this.poinvoicecode = [];
    this.isPocodeAvailable = false;
  }
  // const header = new Headers();
  // header.append("Content-Type", "application/json");
   let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getponnumber/' +this.functionID+ "/" +  this.branchID + "/" + e.target.value, {
    headers: options,
  }).subscribe(resp => {
    this.poinvoicecode = [];
    this.isPocodeAvailable = false;

this.poinvoive_no=resp
for (var i = 0; i < this.poinvoive_no.length; i++) {
  this.poinvoicecode.push({
    po_number: this.poinvoive_no[i].po_number,
      
  });
};

const val = e.target.value;
if (val && val.trim() != '') {
  this.isPocodeAvailable = true;
  this.poinvoicecode = this.poinvoicecode.filter((item) => {
    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  });
}

  })
}
addponumbercode(item:any){
  console.log(item,"item");
  this.poid=item.po_id;
  this.ponumber=item.po_number;
  this.isPocodeAvailable = false;

}

}
