import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';

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
  constructor(private router: Router, private alertcontroller: AlertController, private activatedRoute: ActivatedRoute, private IpaddressService: IpaddressService, private httpclient: HttprequestService) {
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;  
      console.log('this.data ', this.data);
      this.RFQCODE = this.data.rfq;

    });
    this.getCards();
  }
  getCards() {

    this.httpclient.GetRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'get_Manage_RFQ/' + this.data.id).then((res: any) => {
      this.managerfqdetails = res;
      console.log(this.managerfqdetails)
      this.manageRFQCard = this.managerfqdetails.itemDetails;
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
  // item.itemDetails.itemSubCategory,item.itemDetails.rFQCode,item.itemDetails.itemID
  // VendorQuotation() {
  //   this.RequestVenderQuotation==true
  //   showvendorqrotation
  // }

  RequestVenderQuotation() {
    // this.showvendorqrotation = true;
    // this.showvendorqrotationaction = false;
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
