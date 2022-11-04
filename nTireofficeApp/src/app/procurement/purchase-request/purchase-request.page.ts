import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
  providers: [DatePipe]
})
export class PurchaseRequestPage implements OnInit {
  showlineItems: boolean = true
  showviewlist: boolean = false
  showfilter: boolean = true
  release: boolean = false
  getlistitems: any
  expenseArray = [];
  getresponse = [];
  getdataitem = [];
  itemNew: any;
  prsdate: any;

  userid
  branchid
  hideitem: boolean = false;
  showitem: boolean = false;

  // Itemcode: any;

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
  isItemAvailable: boolean;
  assttrecon: any;
  branchname: any;
  showbtn: boolean = true;
  showsubmit: boolean = false;
  showsavebtn: boolean = false;
  itemcode: any;
  getitemdata: any;
  getitemid: any;
  getParamID: string;
  getcategory: string;
  // release



  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private router: Router, private alertController: AlertController, private httpclient: HttpClient, private Ipaddressservice: IpaddressService) {

    this.getParamID = this.route.snapshot.paramMap.get('id');
    console.log(this.getParamID)

  }

  ngOnInit() {
    // this.Itemcode = '';
    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getOrderPriority").subscribe((resp: any) => {
      this.getorder1 = resp;
      this.getorder1.forEach(element => {
        this.getorder.push(element)
      });
    })
    this.userid =
      this.branchid = localStorage.getItem('TUM_BRANCH_ID')
    let date = new Date();
    console.log(date)
    this.prsdate = date;
    this.branchname = localStorage.getItem('TUM_BRANCH_CODE')
    this.requestby = localStorage.getItem('TUM_USER_ID')
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });


    await alert.present();
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
      this.itemdescription = this.getitemdata[0].item_long_desc,
        this.getitemid = this.getitemdata[0].item_id
    });
  }
  getItems(event: any) {
    let items = this.Category;

    if (this.Category == "") {
      this.getdataitem = [];
      this.isItemAvailable = false;
    }

    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemcode" + '/' + items).subscribe((resp: any) => {
      console.log(resp)
      this.getdata1 = resp;
      this.itemNew = this.getdata1;
      // this.getorder1.forEach(element => {
      //   this.getdata.push(element)
      console.log(this.itemNew);
      for (var i = 0; i < this.itemNew.length; i++) {
        // this.getdataitem.push({ id: this.itemNew[i].item_Code, desc: this.itemNew[i].item_id });
        this.getdataitem.push(this.itemNew[i].item_Code);
        // this.getdataitem.push(this.itemNew[i].);
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



  getItemDetail(e:any) {
    
    // console.log(e.target.value,'manoj')
    this.showsavebtn = true
    // let dataa = e.target.value
    // console.log(dataa)
    let getcategory = e;
    console.log(getcategory)
    if (getcategory == "I") {
      this.hideitem = true;
      this.showitem = false;
      this.qty = ""

      this.itemcode = "",
        this.Description = "",
        this.unitprice = "",
        this.netprice = ""


      this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + getcategory).subscribe((resp: any) => {
        console.log(resp)
        this.getdata1 = resp
        this.getorder1.forEach(element => {
          this.getdata.push(element)
          console.log(this.getdata);


        })
      })
    }
    if (getcategory == "S") {
      this.hideitem = false;
      this.showitem = true;
      this.qty = 1

      this.itemcode = "",
        this.Description = "",
        this.unitprice = "",
        this.netprice = "",
        this.Requiredbefore = "",
        this.itemdescription = ""


    }
    if (getcategory == "select") {
      this.hideitem = false;
      this.showitem = false;
      this.showsavebtn = false;

      this.itemcode = "",
        this.Description = "",
        this.unitprice = "",
        this.netprice = "",
        this.qty = "",
        this.itemdescription = ""
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

  Additems() {
    this.showlineItems = !this.showlineItems
    this.showbtn = false;


    this.itemcode = "",
      this.Description = "",
      this.unitprice = "",
      this.netprice = "",
      this.qty = "",
      this.itemdescription = ""



  }

  showline() {  //submit btn
    this.showviewlist = true
    this.showsubmit = true
    this.showlineItems = false
    this.showlineItems = !this.showlineItems;
    if (this.Category == "I") {
      this.getcategory = "Item"
    }
    if (this.Category == "S") {
      this.getcategory = "Service"

    }

    this.expenseArray.push({
      prsid: "",
      itemid: this.getitemid,
      i_function_id: "1",
      required_qty: this.qty.toString(),
      UOM: "15",
      expected_cost: this.netprice,
      exp_date: this.Requiredbefore,
      status: "P",
      created_by: this.userid,
      ipaddress: "",
      unit_price: this.unitprice,
      Limit: "",
      Availlimit: "",
      BalanceLimit: "",
      CATEGORY: this.getcategory,
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

  orderpriority() {
    console.log(this.order)

    if (this.order == "2") //urjent
    {

      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 2);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');
    }
    if (this.order == "1") //critical
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 1);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');

    }
    if (this.order == "3") //high
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 3);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');

    }
    if (this.order == "4") //medium
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 4);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');

    }
    let getdate = new Date();
    this.prsdate = this.datePipe.transform(getdate, 'yyyy-MM-dd');
  }


  delete(i) {
    this.expenseArray.splice(i, 1);
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


    this.getresponse.push({
      "prscategory": this.Category,
      "functionid": "1",
      "prsid": "",
      "prscode": "",
      "status": "P",
      "createdby": this.requestby,
      "ipaddress": "0",
      "reasonpurchase": this.reasonpurchase,
      "netamount": this.netprice,
      "currency": "0",
      "requestcomments": "sample",
      "isbid": "0",
      "prstype": "0",
      "branchid": "1",
      "prsref": "0",
      "userid": this.userid,
      "requestby": this.requestby,
      "requestdate": this.prsdate,
      "requettype": "Q",
      "issinglevendor": "",
      "orderpriority": "",
      "release": this.release.toString(),
      "Itemsdetail": this.expenseArray,
    })
    // window.location.reload()
    // this.router.navigate(['/purchase-request'])
    // this.showviewlist = true
    // this.showlineItems = !this.showlineItems
    var body = {
      prsdetail: this.getresponse,
      // "Itemsdetail": this.expenseArray,
    }
    let options = new HttpHeaders().set('Content-Type', 'application/json')
    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_Insert_Update', body, {
      headers: options, responseType: 'text'
    }).subscribe((res: any) => {
      this.getresponse = res;
      // this.presentAlert("", "RFQ 345/AT Raised Successfully");
      this.presentAlert("", this.getresponse);
      this.router.navigate(['/prsstatus'])
    })


  }


}
