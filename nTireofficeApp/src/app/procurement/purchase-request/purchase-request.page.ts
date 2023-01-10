import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
  providers: [DatePipe]
})
export class PurchaseRequestPage implements OnInit {
  showlineItems: boolean = true;
  showviewlist: boolean = false;
  showfilter: boolean = true;
  release: boolean = false;
  loading: boolean = false;
  getlistitems: any;
  expenseArray = [];
  getresponse = [];
  getdataitem = [];
  itemNew: any;
  prsdate: any;
  filter: boolean = true;
  userid;
  branchid;
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
  Category: any;
  qty;
  additemsbtn: boolean = true;
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
  showcancel: boolean = true;
  showdel: boolean = true;
  itemcode: any;
  getitemdata: any;
  getitemid: any;
  getParamID: string;
  getcategory: any;
  status: any;
  setitemcode: any;
  setredqty: any;
  setexpcost: any;
  setexpdate: any;
  setcretedby: any;
  setunitprice: any;
  getshort: any;
  setcategorydes: any;
  showupdate: boolean = false
  showedit:boolean=true
  getprsmode: any;
  getitemdetails: any;
  getprsdetails: any;
  prsdate1: string;
  prscategory: any;
  getpriority: string;
  // release
  itemCategory;
  itemsubcategory;
  itemdes: any = [];
  splititemcode: any;
  userID: string;
  splitres: any;
  showqty: boolean;
  duplicatePushArray: any = [];
  newitem: any;
  displayName: any;
  compareItems: any =[];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private router: Router, private alertController: AlertController, private httpclient: HttpClient, private Ipaddressservice: IpaddressService, private loadingController: LoadingController) {
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.getParamID = this.route.snapshot.paramMap.get('id');
    // this.getParamID = localStorage.getItem('id');

    if (this.getParamID != null) {
      console.log(this.getParamID)
      // if (!this.getParamID) {
      this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "get_edit_prs" + '/' + this.getParamID + '/' + 1).subscribe((resp: any) => {
        console.log(resp)
        console.log(resp.itemDetails[0])
        this.getitemdetails = resp.itemDetails
        console.log(resp.prsDetails[0])
        this.getprsdetails = resp.prsDetails[0]
        // resp.itemDetails[0].iTEM_CODE


        if (resp.prsDetails[0].status == "p" || resp.prsDetails[0].status == "P") {
          this.release = true
          this.showdel = false
          this.showcancel = false
          this.showbtn = false
        }
        if (resp.prsDetails[0].status == "N" || resp.prsDetails[0].status == "n") {
          this.release = false
          // this.showsubmit = true
          this.showupdate = true;
          this.showcancel = false
        }
        if (resp.prsDetails[0].status == "A") {
          this.showcancel = false
          this.showupdate = true
        }

        let getdate1 = resp.prsDetails[0].created_on
        // getdate1.setDate(getdate1.getDate());
        console.log(getdate1);
        this.prsdate1 = this.datePipe.transform(getdate1, 'MM/dd/yyyy');
        console.log(this.prsdate1);
        if (resp.prsDetails[0].request_type == "D") {
          this.getprsmode = "Direct"
        }
        if (resp.prsDetails[0].request_type == "B") {
          this.getprsmode = "Blanket"
        }
        if (resp.prsDetails[0].request_type == "Q") {
          this.getprsmode = "Quotation"
        }
        if (resp.prsDetails[0].request_type == "T") {
          this.getprsmode = "Tender"
        }


        if (resp.prsDetails[0].pRIORITY == "1") {
          this.getpriority = "Urjent"
        }
        if (resp.prsDetails[0].pRIORITY == "2") {
          this.getpriority = "Critical"
        }
        if (resp.prsDetails[0].pRIORITY == "3") {
          this.getpriority = "High"
        }
        if (resp.prsDetails[0].pRIORITY == "4") {
          this.getpriority = "Medium"
        }
        console.log(this.getprsmode)
        this.prscode = resp.prsDetails[0].prs_code
        this.prsdate = this.prsdate1
        this.prsmode = resp.prsDetails[0].request_type
        this.requestby = resp.prsDetails[0].requested_by
        this.reasonpurchase = resp.prsDetails[0].reason_purchase
        this.order = resp.prsDetails[0].pRIORITY
        this.rfpcomments = resp.prsDetails[0].request_comments
        this.netprice = resp.prsDetails[0].netamount
        this.prscategory = resp.prsDetails[0].prs_category
        this.setcretedby = resp.prsDetails[0].created_by;

        for (let i = 0; i < resp.itemDetails.length; i++) {
          this.setitemcode = resp.itemDetails[i].iTEM_ID;
          this.setredqty = resp.itemDetails[i].rEQUIRED_QTY;
          this.setexpcost = resp.itemDetails[i].eXPECTED_COST;
          this.setexpdate = resp.itemDetails[i].eXP_DATE;
          // this.setcretedby = resp.itemDetails[i].created_by;
          this.setunitprice = resp.itemDetails[i].uNIT_PRICE;
          this.setcategorydes = resp.itemDetails[i].cATEGORY;
          this.getshort = resp.itemDetails[i].iTEM_SHORT_DESC;
          this.itemcode = resp.itemDetails[i].iTEM_CODE;
          console.log(resp.itemDetails[i].iTEM_CODE)
          this.expenseArray.push({
            prsid: this.getprsdetails.prs_id.toString(),
            itemid: this.setitemcode,
            i_function_id: "1",
            required_qty: this.setredqty,
            UOM: "15",
            expected_cost: this.setexpcost,
            exp_date: this.setexpdate,
            status: "P",
            created_by: this.userID,
            ipaddress: "",
            unit_price: this.setunitprice,
            Limit: "",
            Availlimit: "",
            BalanceLimit: "",
            CATEGORY: this.setcategorydes,
            itemcode:this.itemcode,
            TAX1: "",
            TAX2: "",
            TAX1DESC: "",
            TAX2DESC: "",
            OTHERCHARGES: "",
            item_short_desc: this.getshort,
            item_long_desc: this.getshort,
            REMARKS: this.getshort,
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
        }
      })
    }
    // }

  }
  ngOnInit() {

    if (this.getcategory == "") {
      this.getcategory = undefined
    }

    // this.Itemcode = '';
    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getOrderPriority").subscribe((resp: any) => {
      this.getorder1 = resp;
      this.getorder1.forEach(element => {
        this.getorder.push(element)
      });
    })
    // this.userid =
    this.branchid = localStorage.getItem('TUM_BRANCH_ID')
    let date = new Date();
    console.log(date)
    // this.prsdate = date;
    this.branchname = localStorage.getItem('TUM_BRANCH_CODE')
    this.requestby = localStorage.getItem('TUM_USER_NAME')
    this.loading = false;
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

  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }

  checkbox() {
    console.log(this.release)
    if (this.release == false) {
      this.additemsbtn = false;
      this.showcancel = false;
      this.showedit=false
    }

   else if (this.release == true) {
      this.release = false;
      this.showedit=false


    }


    // if (this.status == "N") {
    //   if (this.release == false) {
    //     this.showsubmit = true
    //   }
    //   if (this.release == true) {
    //     this.showsubmit = false
    //   }
    // }
    // if (this.status == "P") {
    //   if (this.release == false) {
    //     this.showupdate = true
    //   }
    //   if (this.release == true) {
    //     this.showupdate = false
    //   }
    // }

  }
  fetchreconcilation(itemcode: any) {

    debugger;
    console.log(itemcode)
    this.compareItems.push(itemcode);
    console.log( this.compareItems,'gadggksjgjk');

// const user = this.compareItems.find((x) => x.itemcode == itemcode)

// if (user) {
//  console.log('Username already exists');
// } else {
//  console.log(user);
// }


    const myArray = itemcode.split("-");
    console.log(myArray);
    this.splititemcode = myArray[0]
    console.log("ee",this.splititemcode);

    this.isItemAvailable = false;
    this.itemcode = itemcode;

    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemDetail" + '/' + this.splititemcode).subscribe((resp: any) => {
      console.log(resp)
      this.getitemdata = resp;
      console.log(this.getitemdata)
      this.Description = this.getitemdata[0].item_short_Desc,
        this.unitprice = this.getitemdata[0].Price
      this.itemdescription = this.getitemdata[0].item_long_desc,
        this.getitemid = this.getitemdata[0].item_id
      this.itemCategory = this.getitemdata[0].itemCategory,
        this.itemsubcategory = this.getitemdata[0].itemSubCategory
    });
  }

  cancel() {
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/prsstatus']);
    this.filter = true;
  }

  getItems(event: any) {
    console.log(this.Category);
    let items = this.Category;
    let data = event.target.value
    if (data == "") {
      this.getdataitem = [];
      this.isItemAvailable = false;
      this.Description = ''
      this.unitprice = ''
      this.netprice = ''
      this.qty = ''
      this.itemdescription = ''
    }
    else {
      this.netprice = '0';
    }

    this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + "getItemcode" + '/' + data).subscribe((resp: any) => {
      console.log(resp)
      this.getdata1 = resp;
      this.getdataitem = []
      // this.itemNew = this.getdata1;
      // this.getorder1.forEach(element => {
      //   this.getdata.push(element)
      console.log(this.getdata1);

      if (this.getdata1 != "No data found") {
        for (var i = 0; i < this.getdata1.length; i++) {
          // this.getdataitem.push({ id: this.getdata1[i].item_Code, desc: this.getdata1[i].item_id });
          this.getdataitem.push(this.getdata1[i].itemdetails,);

          // console.log("itemdes", this.itemdes);
        }
      } else {
        this.getdataitem = []
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
  qtymethod() {
    debugger
    if (this.qty == '' || this.qty == undefined || this.qty == null) {
      this.showqty = true
    } else {
      this.showqty = false
    }
  }


  getItemDetail(e: any) {

    this.showsavebtn = true
    if (this.qty == '' || this.qty == undefined || this.qty == null) {
      this.showqty = true
    } else {
      this.showqty = false
    }
    // let dataa = e.target.value
    // console.log(dataa)
    let getcategory = e;
    console.log(getcategory)
    if (getcategory == "I") {
      this.hideitem = true;
      this.showitem = false;
      this.qty = "",
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
    if (getcategory == "undefined") {
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
    this.showlineItems = !this.showlineItems;
    this.showbtn = false;
    this.filter = false;
    this.itemcode = "",
      this.Description = "",
      this.unitprice = "",
      this.netprice = "",
      this.qty = "",
      this.itemdescription = "",
      // this.Requiredbefore = "",
      this.showsavebtn = true;
      this.Category == undefined
      this.Category=""

    if (this.Category == "undefined"|| this.Category == undefined || this.Category == "") {
      this.hideitem = false;
    }
  }

  new() {
    this.filter = false;
  }

  showline() {  //submit btn
    debugger;
    if (this.itemcode == "" || this.itemcode == "undefined" || this.itemcode == null) {
      this.presentAlert1("add item failed", 'Please Enter Item Code');
    } else if (this.qty == "" || this.qty == "undefined" || this.qty == null) {
      this.presentAlert1("add item failed", 'Please Enter Quantity');
    } else if (this.Requiredbefore == "" || this.Requiredbefore == "undefined" || this.Requiredbefore == null) {
      this.presentAlert1("add item failed", 'Please Enter  Required Before Date');
    }
    else if (this.Category == "" || this.Category == "undefined" || this.Category == null) {
      this.presentAlert1("add item failed", 'Please Enter Category');
    }
    else if (this.netprice == "" || this.netprice == "undefined" || this.netprice == null) {
      this.presentAlert1("add item failed", 'Please Enter Net Price');
    }
    else if (this.Requiredbefore == "" || this.Requiredbefore == "undefined" || this.Requiredbefore == null) {
      this.presentAlert1("add item failed", 'Please Enter Required Before Date');
    }
    else if (this.itemcode[0] ==this.itemcode[i]) {
      this.presentAlert1("add item failed", 'tyer');
    }


    else {
      debugger
      this.showviewlist = true
      this.showsubmit = true

      // if (this.status == undefined || this.status == "") {
      //   this.showsubmit = true
      // }
      // if (this.status == "A" || this.status == "P" || this.status == "N") {
      //   this.showsubmit = false
      //   this.showcancel = false
      //   this.showupdate = true
      // }

      this.showlineItems = false
      this.showlineItems = !this.showlineItems;

      if (this.Category == "I") {
        this.getcategory = "Items"
      }
      if (this.Category == "S") {
        this.getcategory = "Service"
      }

      if (this.userid == undefined) {
        this.userid = this.requestby
      }

      // this.newitem=new Set(this.expenseArray)
      // console.log(this.newitem);
      if (this.expenseArray.length == 0) {
        debugger;
        this.expenseArray.push({
          prsid: "",
          itemid: this.getitemid,
          i_function_id: "1",
          required_qty: this.qty.toString(),
          UOM: "15",
          expected_cost: this.netprice,
          exp_date: this.Requiredbefore,
          status: "P",
          created_by: this.userID,
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
          itemcode: this.itemcode,
          item_short_desc: this.Description,
          item_long_desc: this.itemdescription,
          REMARKS: this.Description,
          CategoryID: this.itemCategory,
          SubCategoryID: this.itemsubcategory,
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

      } else {
        debugger
        for (var i = 0; i < this.expenseArray.length; i++) {
          if (this.expenseArray[i].itemid != this.getitemid) {
            this.expenseArray.push({
              prsid: "",
              itemid: this.getitemid,
              i_function_id: "1",
              required_qty: this.qty.toString(),
              UOM: "15",
              expected_cost: this.netprice,
              exp_date: this.Requiredbefore,
              status: "P",
              created_by: this.userID,
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
              itemcode: this.splititemcode,
              item_short_desc: this.Description,
              item_long_desc: this.itemdescription,
              REMARKS: this.Description,
              CategoryID: this.itemCategory,
              SubCategoryID: this.itemsubcategory,
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
          }
          // else{
          //   this.presentAlert("add item failed", 'Item Added Successfully!');
          // }
        }
      }
    }
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
      this.Requiredbefore = this.datePipe.transform(getdate, "yyyy-MM-dd");
    }
    if (this.order == "1") //critical
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 1);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, "yyyy-MM-dd");
    }
    if (this.order == "3") //high
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 3);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, "yyyy-MM-dd");
    }
    if (this.order == "4") //medium
    {
      let getdate = new Date();
      getdate.setDate(getdate.getDate() + 4);
      console.log(getdate);
      this.Requiredbefore = this.datePipe.transform(getdate, "yyyy-MM-dd");

    }
    let getdate = new Date();
    this.prsdate = this.datePipe.transform(getdate, "yyyy-MM-dd");
  }

  delete(i) {
    this.expenseArray.splice(i, 1);
    this.showlineItems != true;
    this.additemsbtn = true;
    this.showlineItems == true;
    this.showcancel = true;
this.showsubmit = false;
    // this.showlineItems = true;
    // this.showlineItems = !this.showlineItems;
  }


  edit(i) {
    console.log(i);
    if(this.release == false)
    {
    this.showlineItems = !this.showlineItems
    let J = i
    // this.itemcode = this.getitemdetails[J].iTEM_CODE,
      this.Description = this.getitemdetails[J].iTEM_SHORT_DESC,
      this.unitprice = this.getitemdetails[J].uNIT_PRICE,
      // this.netprice = this.getitemdetails[J].iTEM_CODE,
      this.qty = this.getitemdetails[J].rEQUIRED_QTY,
      this.itemdescription = this.getitemdetails[J].iTEM_SHORT_DESC
    }
    // this.setitemcode = resp.itemDetails[i].iTEM_CODE;
    // this.setredqty = resp.itemDetails[i].rEQUIRED_QTY;
    // this.setexpcost = resp.itemDetails[i].eXPECTED_COST;
    // this.setexpdate = resp.itemDetails[i].eXP_DATE;
    // this.setcretedby = resp.itemDetails[i].created_by;
    // this.setunitprice = resp.itemDetails[i].uNIT_PRICE;
    // this.setcategorydes = resp.itemDetails[i].cATEGORY;
    // this.getshort = resp.itemDetails[i].iTEM_SHORT_DESC;
  }

    async clear() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Clear the Process',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.prsmode = "undefined"
            this.reasonpurchase = "undefined"
            // this.referenceifany = ""
            this.rfpcomments = ""
            this.order = "undefined"
            this.prsdate = ""
            this.prscode = ""
            // this.requestby = ""
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

  update() {
debugger;
    // if (this.release == false) {
      // this.presentAlert1("add item failed", 'Please click Release');
    // }
    // else if (this.Category = "" || this.Category == "undefined" || this.Category == null) {
    //   this.presentAlert1("add item failed", 'Please Enter add-item Fields');
    // }
    // else if (this.itemcode == "" || this.itemcode == "undefined" || this.itemcode == null) {
    //   this.presentAlert1("add item failed", 'Please Enter All Fields');
    // }

    if (this.release == true) {
      this.status = "P"
    }
    if (this.release == false) {
      this.status = "N"
    }

    if (this.order == "Urjent") {
      this.order = "1"
    }
    if (this.order == "Critical") {
      this.order = "2"
    }
    if (this.order == "High") {
      this.order = "3"
    }
    if (this.order == "Medium") {
      this.order = "4"
    }


    this.getresponse.push({
      "prscategory": "U",
      "functionid": "1",
      "prsid": this.getprsdetails.prs_id.toString(),
      "prscode": this.prscode,
      "status": this.status,
      "createdby": this.userID,
      "ipaddress": "0",
      "reasonpurchase": this.reasonpurchase,
      "netamount": this.netprice,
      "currency": "1",
      "requestcomments": this.rfpcomments,
      "isbid": "0",
      "prstype": "0",
      "branchid": "1",
      "prsref": "0",
      "userid": this.userID,
      "requestby": this.requestby,
      "requestdate": this.prsdate,
      "requettype": this.prsmode,
      "issinglevendor": "0",
      "orderpriority": this.order,
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
      console.log(res);
      this.presentAlert("", "Successfully updated");
      //  this.router.navigate(['/prsstatus'])

      this.loading = true;
    })
  }
  submit() {

    if (this.prsmode == "" || this.prsmode == "undefined" || this.prsmode == null) {
      this.presentAlert1("add item failed", 'Please Enter PRS Mode');
    } else if (this.reasonpurchase == "" || this.reasonpurchase == "undefined" || this.reasonpurchase == null) {
      this.presentAlert1("add item failed", 'Please Enter Reason For Purchase');
    }

    else {

      if (this.release == true) {
        this.status = "P"
      }
      if (this.release == false) {
        this.status = "N"
      }

      if (this.order == "Urjent") {
        this.order = "1"
      }
      if (this.order == "Critical") {
        this.order = "2"
      }
      if (this.order == "High") {
        this.order = "3"
      }
      if (this.order == "Medium") {
        this.order = "4"
      }

      this.getresponse.push({
        // "prscategory": this.Category,
        "prscategory": "I",
        "functionid": "1",
        "prsid": "",
        "prscode": "",
        "status": this.status,
        "createdby": this.userID,
        "ipaddress": "0",
        "reasonpurchase": this.reasonpurchase,
        "netamount": this.netprice,
        "currency": "1",
        "requestcomments": this.rfpcomments,
        "isbid": "0",
        "prstype": "0",
        "branchid": "1",
        "prsref": "0",
        "userid": this.userID,
        "requestby": this.userID,
        "requestdate": this.prsdate,
        "requettype": this.prsmode,
        "issinglevendor": "0",
        "orderpriority": this.order,
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
        this.displayName = res;
        // this.presentAlert("", "RFQ 345/AT Raised Successfully");
        this.presentAlert("", this.getresponse);
        //       this.splitres=res.split(":")
        // this.prscode=this.splitres[1]
        //       console.log("split",  this.splitres);
        this.loading = false;
        // this.router.navigate(['/prsstatus'])

var pduedte_array = this.displayName.split(':');
console.log(pduedte_array[1]);
this.prscode =pduedte_array[1];
      })
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
    });
    return await loading.present();
  }

  async loadingdismiss() {
    return await this.loadingController.dismiss();
  }

}
