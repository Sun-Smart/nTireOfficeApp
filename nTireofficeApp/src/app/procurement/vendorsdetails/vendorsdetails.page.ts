import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IpaddressService } from 'src/app/ipaddress.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IpaddressService } from 'src/app/service/ipaddress.service';
@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.page.html',
  styleUrls: ['./vendorsdetails.page.scss'],
})
export class VendorsdetailsPage implements OnInit {


  usertypechk:any = window.localStorage['TUM_USER_TYPE'];
  vendorlist_res:any;
  vendorlist:any;
  vendorid_res:any;
  vendor_id:any;
  vendor_name:any;
  vendor_code:any;
  vendorDetail_res:any;
  vendorDetail:any;
  myvendordetail_res:any = [];
  myvendordetail:any=[];
  compcategroy_res:any;
  compcategroy:any;
  vendorcatgry_res:any;
  vendorcatgry:any;
  companytype_res:any;
  comptype:any;
  country_res:any;
  country:any;
  loading:boolean = false;


  myobj={
    userid:window.localStorage['TUM_USER_ID'],
    usertoken:window.localStorage['usertoken'],
    access_token:window.localStorage['token']
     }

  constructor(private http: HttpClient, public Ipaddressservice: IpaddressService,) { }

  ngOnInit() {
    this.getvendorid();
    var myobj={
      userid:window.localStorage['TUM_USER_ID'],
      usertoken:window.localStorage['usertoken'],
      access_token:window.localStorage['token']
       }
       this.vendorcategory(myobj);
       this.companycategory(myobj);
       this.companytype(myobj);
       this.vendorCountry(myobj);
       this.vendorRegion(myobj);
  }

  getvendorid(){
    this.usertypechk = window.localStorage['TUM_USER_TYPE'];

    if (this.usertypechk == 1) {
      var userid=window.localStorage['TUM_USER_ID'];

  var usertoken=window.localStorage['usertoken'];

  var token=window.localStorage['token'];

    var obj={
    userid:userid,
    usertoken:usertoken,
    access_token:window.localStorage['token'],
    FUNCTION_ID:window.localStorage['FUNCTION_ID'],
      USERCODE:window.localStorage['TUM_USER_CODE']
      }
      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'getvendorlist/',obj).subscribe(res=>{

        console.log(res);
        this.vendorlist_res = res;
        this.vendorlist = this.vendorlist_res.recordset;
      },err=>{
        console.log(err);
      })
    } else {
      var userid=window.localStorage['TUM_USER_ID'];

      var usertoken=window.localStorage['usertoken'];

      var token=window.localStorage['token'];
      var obj1={
        userid:userid,
        usertoken:usertoken,
        access_token:window.localStorage['token'],
        FUNCTION_ID:window.localStorage['FUNCTION_ID'],
          USERCODE:window.localStorage['TUM_USER_CODE']
          }

      this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'get_vendorid/',obj1).subscribe(res=>{

        console.log(res);
        this.myvendordetail_res = res;
        this.myvendordetail = this.myvendordetail_res.recordset;
        window.localStorage['VENDOR_CODE'] = this.myvendordetail[0].Vendor_Code;
        window.localStorage['VENDOR_ID'] = this.myvendordetail[0].vendor_id;
        window.localStorage['Vendor_NAME'] = this.myvendordetail[0].Vendor_Name;
        this.vendor_id = window.localStorage['VENDOR_ID'];
        this.vendor_name = window.localStorage['Vendor_NAME']
        this.vendor_code = window.localStorage['VENDOR_CODE'];
        this.vendorDetails();
      },err=>{
        console.log(err);
      })

      //$scope.vendorDetails();
    }
  }

  vendorDetails(){
    this.vendor_code = window.localStorage['VENDOR_CODE'];
    var userid=window.localStorage['TUM_USER_ID'];

  var usertoken=window.localStorage['usertoken'];

 var token=window.localStorage['token'];

    var ven_obj = {
    userid:userid,
    usertoken:usertoken,
    access_token:window.localStorage['token'],
   Vendorcode:this.vendor_code,
   FUNCTION_ID:window.localStorage['FUNCTION_ID'],
  //  USERCODE:window.localStorage['TUM_USER_CODE'],
  //  VENDORID:this.vendor_id,
   ITEMCODE:'',
   SORTEXPRESSION:'item_uom',
   ALPHANAME:''

   }

    //var id = 14;
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'get_vendordetails/',ven_obj).subscribe(res=>{
      console.log(res);
      this.vendorDetail_res = res;
    },err=>{
      console.log(err);
    })
  }

  vendorcategory(myobj){
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_category/',myobj).subscribe(res=>{
      console.log(res);
      this.vendorcatgry_res = res;
      this.vendorcatgry = this.vendorcatgry_res.recordset;

    },err=>{
      console.log(err);
    })
  }

  companycategory(myobj){
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'company_category/',myobj).subscribe(res=>{
      console.log(res);
      this.compcategroy_res = res;
      this.compcategroy = this.compcategroy_res.recordset;
    },err=>{
      console.log(err);
    })
  }

  companytype(myobj){
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'company_type/',myobj).subscribe(res=>{
      console.log(res);
      this.companytype_res = res;
      this.comptype = this.companytype_res.recordset;
    },err=>{
      console.log(err);
    })
  }

  vendorCountry(myobj){
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_country/',myobj).subscribe(res=>{
      console.log(res);
      this.country_res = res;
      this.country = this.country_res.recordset;
      this.country.forEach(element => {
        element.VAL = String(element.VAL);
      });
    },err=>{
      console.log(err);
    })
  }

  vendorRegion(myobj){
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_region/',myobj).subscribe(res=>{
      console.log(res);

    },err=>{
      console.log(err);
    })
  }

getvendordetails(code){
  this.loading = true;
  this.vendor_code = code;
  var userid=window.localStorage['TUM_USER_ID'];
  var usertoken=window.localStorage['usertoken'];
  var token=window.localStorage['token'];

  var ven_obj = {
    userid:userid,
    usertoken:usertoken,
    access_token:window.localStorage['token'],
    vendorid:this.vendor_code
  }

  //var id = 14;
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendordetails/',ven_obj).subscribe(res=>{
    console.log(res);
    this.loading = false;
    this.myvendordetail_res = res;
    this.myvendordetail = this.myvendordetail_res.recordset;
  },err=>{
    console.log(err);
  })
 }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event);

    this.getvendordetails(event.value.Vendor_Code);
  }



}

