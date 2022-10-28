import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { ToastmessageService } from 'src/app/service/toastmessage.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
})
export class PurchaseRequestPage implements OnInit {
  showlineItems: boolean = true
  showviewlist: boolean = false
  showfilter: boolean = true
  release: boolean = false
  getlistitems: any
  expenseArray = [];
  getdataitem = [];
  itemNew: any;
  prsdate: any;

  userid
  branchid
  hideitem: boolean = false;
  showitem: boolean = true;



  branch
  Requisitiondate
  prscode

  prsmode;
  reasonpurchase;
  referenceifany;
  rfpcomments;
  order;
  requestby;

  Description
  Item
  Category;
  qty;
  unitprice;
  Requiredbefore
  netprice;
  itemdescription;
  getorder = [];
  getorder1: any;
  getdata = [];
  getdata1: any;
  getitemdata: any;
  itemcode: any;
  isItemAvailable: boolean;
  assttrecon: any;
  branchname: any;
  showbtn: boolean = true

  constructor(public toastmessageService: ToastmessageService, private router: Router, private alertController: AlertController, private httpclient: HttpClient, private Ipaddressservice: IpaddressService) {

  }

  ngOnInit() {
    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getOrderPriority").subscribe((resp: any) => {
      this.getorder1 = resp;
      this.getorder1.forEach(element => {
        this.getorder.push(element)
      });
    })
    this.userid = localStorage.getItem('TUM_USER_ID')
    this.branchid = localStorage.getItem('TUM_BRANCH_ID')
    let date = new Date();
    console.log(date)
    this.prsdate = date;
    this.branchname = localStorage.getItem('TUM_BRANCH_CODE')
  }
  getItems(event: any) {
    let items = this.Category;

    if (this.Category == "") {
      this.getdataitem = [];
      this.isItemAvailable = false;
    }

    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + items).subscribe((resp: any) => {
      console.log(resp)
      this.getdata1 = resp;
      this.itemNew = this.getdata1;
      // this.getorder1.forEach(element => {
      //   this.getdata.push(element)
      console.log(this.itemNew);
      for (var i = 0; i < this.itemNew.length; i++) {
        this.getdataitem.push(this.itemNew[i].item_Code);
      }
      console.log(this.getdataitem);
      const val = event.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.getdataitem = this.getdataitem.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
        console.log(this.getdataitem)
      }
    })
  }


  getItemDetail(e) {
    let getcategory = this.Category
    console.log(getcategory)
    if (getcategory == "IT") {
      this.hideitem = true;
      this.showitem = false;
      this.qty = ""
      this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + getcategory).subscribe((resp: any) => {
        console.log(resp)
        this.getdata1 = resp
        this.getorder1.forEach(element => {
          this.getdata.push(element)
          console.log(this.getdata);

        })
      })
    }
    if (getcategory == "Service") {
      this.hideitem = false;
      this.showitem = true;
      this.qty = 1

    }
    // this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + getcategory).subscribe((resp: any) => {
    //   console.log(resp)
    //   this.getdata1 = resp
    //   this.getorder1.forEach(element => {
    //     this.getdata.push(element)
    //     console.log(this.getdata);

    //   })
    // })
  }

  fetchreconcilation(itemcode: any) {
    console.log(itemcode)
    this.itemcode = itemcode;
    this.isItemAvailable = false;
    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + this.itemcode).subscribe((resp: any) => {
      console.log(resp)
      this.getitemdata = resp;
      console.log(this.getitemdata)
      this.Description = this.getitemdata[0].item_short_Desc,
        this.unitprice = this.getitemdata[0].Price
      this.itemdescription = this.getitemdata[0].item_long_desc
    });
  }
  Additems() {
    this.showlineItems = !this.showlineItems
    this.showbtn = false
  }
  showline() {  //submit btn

    if (this.itemcode == "" || this.itemcode == undefined) {
      this.toastmessageService.presentAlert1("", "Select Item Type");
    }
    if (this.qty == undefined || this.qty == "") {
      this.toastmessageService.presentAlert1("", "Enter QTY");
    }
    if (this.Requiredbefore == undefined || this.Requiredbefore == "") {
      this.toastmessageService.presentAlert1("", "Select Required Date ");
    }
    this.showviewlist = true
    this.showlineItems = false
    this.showlineItems = !this.showlineItems
    this.expenseArray.push({
      prsid: "",
      itemid: this.itemcode,
      i_function_id: "1",
      required_qty: this.qty,
      UOM: "15",
      expected_cost: "100",
      exp_date: this.Requiredbefore,
      status: "A",
      created_by: "210",
      netprice: this.netprice,
      ipaddress: "",
      unit_price: this.unitprice,
      Limit: "",
      Availlimit: "",
      BalanceLimit: "",
      CATEGORY: this.Category,
      TAX1: "",
      TAX2: "",
      TAX1DESC: "",
      TAX2DESC: "",
      OTHERCHARGES: "",
      item_short_desc: this.Description,
      item_long_desc: this.itemdescription,
      REMARKS: "",
      CategoryID: "",
      SubCategoryID: "",
      prsDetailID: "",
      FreightVALUE: "",
      FreightID: "",
      RecoveryVALUE: "",
      RecoveryID: "",
      BDC: "",
      PTM: "",
      ACC: "",
      CPC: "",
      flag: "I"

    })
    console.log(this.expenseArray)
    this.showbtn = true
  }

  async clear() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Clear the Process',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {

            this.prsmode = ""
            this.reasonpurchase = ""
            this.referenceifany = ""
            this.rfpcomments = ""
            this.order = ""
            this.requestby = ""
            this.expenseArray = []
          }
        }
      ]
    });

    await alert.present();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }
  close() {
    this.showlineItems = !this.showlineItems
    this.showbtn = true
  }
  submit() {
    // window.location.reload()
    // this.router.navigate(['/purchase-request'])
    // this.showviewlist = true
    // this.showlineItems = !this.showlineItems
    var body = {
      "prscategory": this.Category,
      "functionid": "1",
      "prsdate": this.prsdate,
      "prsid": "",
      "prscode": "",
      "status": "0",
      "createdby": this.userid, //userid
      "ipaddress": "0",
      "reasonpurchase": this.reasonpurchase,
      "netamount": this.netprice,
      "currency": "0",
      "requestcomments": "0",
      "isbid": "0",
      "prstype": "0",
      "branchid": this.branchid,//TUM_BRANCH_ID
      "prsref": "0",
      "userid": this.userid,//userid
      "requestby": this.userid,//userid
      "requestdate": "",
      "requettype": this.prsmode,
      "issinglevendor": "",
      "orderpriority": "",
      "release": this.release,
      "item": this.expenseArray,

    }

    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_Insert_Update', body).subscribe((res: any) => {
      // this.getresponse = res;
      console.log(res)
    })


  }


}
