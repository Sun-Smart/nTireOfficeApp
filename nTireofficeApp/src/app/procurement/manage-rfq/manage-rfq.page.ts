import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.page.html',
  styleUrls: ['./manage-rfq.page.scss'],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})

export class ManageRfqPage implements OnInit {
  showvendorqrotation: boolean = false;
  showvendorqrotationaction: boolean = true;
  selectAllissue: boolean = false;
  selectAllvendor: boolean = false;
  disabled: boolean = false;
  showitemdetails_grid: boolean = true;
  showvendorlist_grid: boolean = false;
  findvendor;
  splitted;
  function;
  branch;
  userID;
  usertype;
  userToken;
  accessToken;
  username;
  functionID;
  branchID;
  sub: any;
  data: any;
  managerfqdetails;
  manageRFQCard: any;
  findVendorDetails;
  findvedor;
  ItemID;
  RFQCODE;
  RFQID;
  VendorList;
  Checked;
  Requestrequstion:any=[];
  quotationDetails;
  constructor(private router: Router, private alertcontroller: AlertController, private activatedRoute: ActivatedRoute, private IpaddressService: IpaddressService, private httpclient: HttpClient) {
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
      console.log('this.data ', this.data);
      this.RFQCODE = this.data.rfq;
      this.RFQID = this.data.id;
    });
  }

  ngOnInit() {

    this.getCards();
    this.getVendorDetails();
  }
  getCards() {

    this.httpclient.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'get_Manage_RFQ/' + this.data.id).subscribe((res: any) => {
      this.managerfqdetails = res;
      console.log(this.managerfqdetails)
      this.manageRFQCard = this.managerfqdetails.itemDetails;
    })
  }

getVendorDetails(){
  this.httpclient.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'getvendor_RFQ?functionId='+this.functionID+'&rfqcode='+this.RFQCODE).subscribe((res : any) =>{
    console.log(res);
    this.VendorList = res;

      })
}


  findrfq(item: any) {
    console.log(item)
    // this.findvedor = item.itemDetails

    var str = item.rFQCode;
    console.log(str)
    this.splitted = str.split('/');
    console.log(this.splitted);
    this.splitted = this.splitted[1];
    console.log('new', this.splitted)
    this.router.navigate(['/vendorsdetails', this.splitted,item.itemCategory,item.itemSubCategory,item.itemID,item.rFQCode,item.item_Code,item.item_short_Desc]);
  }
  fieldsChange(values:any,item:any):void {
    console.log(values.currentTarget.checked);
    this.Checked = values.currentTarget.checked;
    console.log(item);

    if(this.Checked == true){
      this.Requestrequstion.push({
        "ItemID":item.ITEM_ID,
        "RFQID":item.RFQID,
        "vendor_id":item.VENDOR_ID,
        "branchid":item.branch_id,
        "quotationdate":item.quotationdate,
        "itemsubcategory":item.ITEMSUBCATEGORY,
        "requiredqty":item.requiredqty,
        "NetPrice":item.NET_PRICE_PER_UNIT,
        "strUserId":this.userID,
        "strIpAddress":"",
        "Email":item.Email,
        "VENDORITEMID":item.VENDORITEMID,
        "PRSDetailsID":item.PRSDetailsID,
        "NETP":item.netp

      });
      console.log(this.Requestrequstion);
    }
    else {
      var index = this.Requestrequstion.indexOf(item);
      if(index > -1){
        this.Requestrequstion.splice(index,1)
        console.log(this.Requestrequstion,'filterarray');
      }


    }
  }

  RequestVenderQuotation() {
    // this.showvendorqrotation = true;
    // this.showvendorqrotationaction = false;
    let body={
      "Raise_quotation" :[
        {
          "Raise_details" : this.Requestrequstion
        }
      ]
    }

    this.httpclient.post(this.IpaddressService.ipaddress1+this.IpaddressService.serviceerpapi+'Request_for_quotation',body).subscribe((res :any) =>{
      this.quotationDetails = res;
    })
    this.presentAlert("", "Quotation Requested Successfully");
  }

  cancel() {
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/rfq'])
  }

  selectAllissueCheckbox(value) {
    console.log(value);
    if (value == false) {
      this.selectAllissue = true;
    }
    else {
      this.selectAllissue = false;
    }
  }

  selectAllvendorCheckbox(value) {
    console.log(value);
    if (value == false) {
      this.selectAllvendor = true;
    }
    else {
      this.selectAllvendor = false;
    }
  }
  back() {
    this.router.navigate(['/rfq'])
  }
  VendorQuotation() {

    this.router.navigate(['/vendor-quotation'])
  }

  //   add(value)
  //   {
  //   if (value == false)
  // {
  //   this.showvendorlist_grid = false;
  //   this.showitemdetails_grid = true;
  // }
  // else
  // {
  //   this.showvendorlist_grid = true;
  //   this.showitemdetails_grid = true;
  // }
  // }

  async presentAlert(heading, tittle) {
    var alert = await this.alertcontroller.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}
