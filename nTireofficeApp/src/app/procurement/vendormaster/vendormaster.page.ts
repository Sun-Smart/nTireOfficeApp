
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { IpaddressService } from 'src/app/ipaddress.service';

// import { VendormasterModalPage } from '../vendormaster-modal/vendormaster-modal.page';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { VendormasterModelPage } from '../vendormaster-model/vendormaster-model.page';
class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-vendormaster',
  templateUrl: './vendormaster.page.html',
  styleUrls: ['./vendormaster.page.scss'],
})
export class VendormasterPage implements OnInit {


  VendorCode:any;
  vendordetails:any;
  vendordetails_resp:any;
  vendorname:any;
  address:any;
  functionname:any =window.localStorage['FUNCTION_DESC'];;
  vendormaster_resp:any;
  vendormaster:any;
  vendorcode:any;
  vendorcode_resp:any;
  showfilter:boolean = true;
  loading:boolean = false;

  constructor(public modalController: ModalController, private http: HttpClient, public Ipaddressservice: IpaddressService) { }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.vendoritemsview();
  }

  async view(data) {
    console.log(data);
    const modal = await this.modalController.create({
      component: VendormasterModelPage,
      cssClass: 'my-custom-class',
      componentProps: {
        itemdata: data
      }
    });
    return await modal.present();
  }

  displaydetails(event){
    this.loading = true;
    console.log(event);
    // console.log(this.VendorCode,vendorcode.vendor_id);
    var userid = window.localStorage['TUM_USER_ID'];

    var usertoken = window.localStorage['usertoken'];

    var token = window.localStorage['token'];
    var obj = {
      userid: userid,
      usertoken: usertoken,
      access_token: window.localStorage['token'],
      code: event.item.Vendor_Code
    }

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'vendor_detail/',obj).subscribe(res=>{
      console.log(res);
      this.loading = false;
      // this.vendordetails_resp = res;
      // this.vendordetails = (this.vendordetails_resp.recordset);
      this.vendormaster_resp = res;
      this.vendormaster =this.vendormaster_resp.recordset;
      if(this.vendormaster!=undefined){
       this.vendorname = { vendor_id: this.vendormaster[0].Company, Vendor_Name: this.vendormaster[0].CompanyName };
       this.VendorCode = { vendor_id:this.vendormaster[0].Company, Vendor_Code: this.vendormaster[0].Code };

    }


      //console.log();
      //console.log(response.data.recordset[0].Add1)
      // this.vendorname = this.vendordetails[0].CompanyName;
    //  this.address = this.vendordetails[0].Address1;
      // this.VendorCode = this.vendordetails[0].Code;
    },err=>{
      console.log(err);
    })
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
  }

  getvendor(VendorCode){


    var userid = window.localStorage['TUM_USER_ID'];
    var functionid = window.localStorage['FUNCTION_ID'];
    var userid = window.localStorage['TUM_USER_ID'];

    var obj = {
      userid: userid,
      usertoken: window.localStorage['usertoken'],
      access_token: window.localStorage['token'],
      VENDORID: this.VendorCode.id,
      Vendorcode: this.VendorCode.code,
      FUNCTIONID: functionid,
      ItemCode: '',

    }
    console.log(obj)

    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceerpapi+'get_vendordetails/',obj).subscribe(res=>{
      console.log(res);
      this.vendormaster_resp = res;

      this.vendormaster =this.vendormaster_resp.recordset;
    },err=>{
      console.log(err);
    })
  }

  vendoritemsview(){

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

  portChange(event: {
    // component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event);
  }


}
