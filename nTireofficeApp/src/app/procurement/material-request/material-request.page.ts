import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastmessageService } from 'src/app/service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { IpaddressService } from 'src/app/ipaddress.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.page.html',
  styleUrls: ['./material-request.page.scss'],
})
export class MaterialRequestPage implements OnInit {
  showbtn: boolean = true;
  showlineItems: boolean = false;
  showviewlist:boolean=false;
  hideviewlist:boolean=false;
  hidefilter:boolean=true;
  loading:boolean=false;
  mrscode;
  hidelineItems: boolean;
  visible:boolean = false;
  Additem:boolean = true;
  expenseArray = [];
  showlineItems1:boolean=true;
  shownewcard:boolean=false;
  ShowAllItem:boolean=true;
  Showcard:boolean=false;
  overallsubmit:boolean = true;
  submitview: boolean =false;
  initialSearch:boolean=true;
  overallsubmitnew:boolean=false;
  showfilter: boolean = true;
  filter: boolean = true;
  release=false;
  funtionID;
  branch_ID;
  branch;
  userID;
  usertype;
  fromdate;
  todate;
  priority;
  reasonrequest;
  requiredbefore;
  sno;
  itemcode;
  itemdepreciation;
  uom;
  unitprice;
  stockqty;
  requestqty;
  remarks;
  requestby;
  mrsdate;
  materialreqsearch: any;
  materialrequestsearch: any;
  data: any;
  todate2;
  fromdate2;
  status;
  cusstatus: any;
  MRS_CODE: any;
  allbranch_res: string;
  allbranch: any;
  usertoken: any;
  Branchname: any;
  MRScode: any[];
  isPropertycodeAvailable: boolean;
  mrs_no: any;
  mrsnum: any;
  getdataitem: any=[];
  isItemAvailable: boolean;
  getdata1: any;
  itemNew: any;
  getitemdata: any;
  Description: any;
  itemdescription: any;
  getitemid: any;
  netprice: any;
  itemdetails: string;
  stock_uom: string;
  WeightUOM: string;

  constructor( private router :Router,private alertController: AlertController,private toastmessageservice :ToastmessageService,private datePipe: DatePipe, private HttpClient: HttpClient, private IpaddressService: IpaddressService)
  {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
    this.requestby = localStorage.getItem('TUM_USER_NAME');
    this.usertoken = window.localStorage['usertoken'];
  }

  ngOnInit() {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    this.mrsdate = this.datePipe.transform(todayDate,'YYYY/MM/dd');
    console.log(this.mrsdate);
    this.Branchname = localStorage.getItem('TUM_BRANCH_CODE');
  }
  // getallbranches() {
  //   var obj = {
  //     userid: this.userID,
  //     usertoken: this.usertoken,
  //     access_token: window.localStorage['token']
  //   }
  //   this.HttpClient.post(this.IpaddressService.ipaddress + this.IpaddressService.serviceerpapi + 'getAllBranches/', obj).subscribe(res => {
  //     console.log(res);
  //     let res1 = JSON.stringify(res)
  //     this.allbranch_res = res1;
  //     console.log(this.allbranch_res)

  //     this.allbranch = JSON.parse(this.allbranch_res);
  //     // this.allbranch = this.allbranch_res.recordset;
  //   }, err => {
  //     console.log(err);
  //   })
  // }
  setValue(value:any){
    console.log(value)
    if(this.priority==1){
      let getdate = new Date();

      getdate.setDate(getdate.getDate());
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)
    }
    if(this.priority==2){
      let getdate = new Date();

      getdate.setDate(getdate.getDate()+2);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)

    }
    if(this.priority==3){

      let getdate = new Date();

      getdate.setDate(getdate.getDate()+3);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)

    }
    if(this.priority==4){

      let getdate = new Date();

      getdate.setDate(getdate.getDate()+1);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)
    }
      }


  SearchItems(){
    this.showviewlist = true
    this.showbtn = true

    if(this.fromdate == "<< Select >>" || this.fromdate == undefined){
      var fromdate = 'null';
     }else{
      this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
      fromdate= this.fromdate2;
     }

     if(this.todate == "<< Select >>" || this.todate == undefined){
      var todate = 'null';
     }else{
      this.todate2 = this.datePipe.transform(this.todate, 'dd/MM/YYYY');
      todate= this.todate2;
     }

     if(this.status == "<< Select >>" || this.status == undefined){
      var MRSTATUS = "0";
     }else{
      MRSTATUS= this.status;
     }

     if(this.cusstatus == "<< Select >>" || this.cusstatus == undefined)
     {
var cusstatus = "0";
     }
     else{
      cusstatus = this.status;
     }


    let body =
    {
        "FUNCTIONIDM": this.funtionID,
       "BRANCHM": this.Branchname,
       "MRSCODEM":this.MRS_CODE||"",
       "ITEMCODEM":"ITE",
       "DATEFROMM": fromdate||"",
       "DATETOM": todate||"",
        "STATUSM":"",
        "CUTSTATUSM":MRSTATUS,
       "MENUIDM":"",
        "PAGEINDEXM":0,
       "PAGESIZEM":10,
       "SORTEXPRESSIONM":"mrs_code",
       "ALPHANAMEM":"",
       "USERTYPEM":this.usertype,
        "USERIDM":this.userID
     }


this.HttpClient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'MaterialRewuistionDetails',body).subscribe((res: any) => {
  this.materialrequestsearch = res;
  console.log(this.materialrequestsearch)
  // this.materialreqsearch = this.materialrequestsearch.itemDetails;
})
  }


  Addnewitem(){
    this.showlineItems1 = !this.showlineItems1;

    this.ShowAllItem = false;
    if(this.release ==true)
     {
      this.status= 'P';
     }
     else
     {
      this.status= 'N';
     }
  }

  onsubmit(){
    this.toastmessageservice.presentAlert1('saved successfully','this process is saved successfully')
    this.showlineItems =!this.showlineItems;
    this.expenseArray=[];
    this.initialSearch=true;
    this.showlineItems=false;
    this.showfilter = true;
    this.filter = true;
    // this.showbtn = true
  // this.ngOnInit();
  }

  showline(){

    this.showlineItems = false;
    this.Showcard = true;
    this.shownewcard =false;
    this.overallsubmit = true;
    this.submitview =!this.submitview;
    this.overallsubmitnew =true;
    this.expenseArray.push({

      "mrsdetail_id":'',
      "MRS_ID": "",
      "Item_Id": this.getitemid ,
      "FUNCTION_ID": "1",
      "RequiredQty":this.requestqty,
      "EXP_DATE": this.requiredbefore,
      "CREATED_BY": this.userID,

      "LST_UPD_BY": this.userID,
      "IPADDRESS": "",
      "STATUS": "A",
      "unitprice": this.unitprice,
      "netamount":  this.netprice,

      "remarks":  this.remarks,
      "item_detailed_description": this.itemdescription,
      "BDC": "BDC",
      "PTM": "PTM",
      "ACC":"ACC",
      "CPC":"CPC",
      "VechileNO":"12345"
    })
    console.log(this.expenseArray)
    this.showbtn = true;

    if(this.status == "<< Select >>" || this.status == undefined){
      var INSUPSTATUS = "0";
     }else{
      INSUPSTATUS= this.status;
     }
  }

  Searchlist(){
    debugger;
    // this.initialSearch =! this.initialSearch;
    // this.showfilter =! this.showfilter;
    this.showbtn = true;
  }

  Additems() {
    this.shownewcard=true
    this.ShowAllItem = false;
    this.overallsubmit=false;
    // this.shownewcard==!this.shownewcard
  }

  new(){
        this.showlineItems = !this.showlineItems
    // this.showviewlist = false;
    // this.Showcard = false;
    this.overallsubmit=true;
    this.initialSearch = false;
    this.showlineItems = true;
    this.showbtn = false;
    this.showfilter = false;
    this.filter = false;
  }

  async clear() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
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

            this.MRS_CODE = "";
            this.status = "";
            this.todate = "";
            this.fromdate = "";


          }
        }
      ]
    });

    await alert.present();
  }

  hideline(){
    this.hidelineItems=!this.hidelineItems
    // this.showfilter = !this.showfilter;
    // this.Additem = !this.Additem;
    // this.visible = !this.visible
  }

  submit(){
    this.showviewlist=true
    this.hideviewlist=true
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }

  close(){
    this.reasonrequest='';
    this.priority = '';
    this.shownewcard=!this.shownewcard
    this.overallsubmit=true;
    }

  Search() {
    this.loading=true;
    this.showviewlist = true;
    if(this.mrscode ==undefined){
      this.mrscode=''
    }}


close1(){
  this.showlineItems=false
  this.showfilter=true
}

getMRSCode(e:any){


  this.MRScode = [];
  if (e.target.value == "") {
    this.MRScode = [];
    this.isPropertycodeAvailable = false;
  }
  // const header = new Headers();
  // header.append("Content-Type", "application/json");
   let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.HttpClient.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'MRScode/'  + e.target.value, {
    headers: options,
  }).subscribe(resp => {
    this.MRScode = [];
    this.isPropertycodeAvailable = false;

this.mrs_no=resp
for (var i = 0; i < this.mrs_no.length; i++) {
  this.MRScode.push({
    mrs_code: this.mrs_no[i].mrs_code,

  });
};

const val = e.target.value;
if (val && val.trim() != '') {
  this.isPropertycodeAvailable = true;
  this.MRScode = this.MRScode.filter((item) => {
    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  });
}

  })
}


addponumbercode(item:any){
  console.log(item,"item");
  this.MRS_CODE=item.mrs_code;
  this.isPropertycodeAvailable = false;
}


getItems(event: any) {
  debugger
  let items = event.target.value
    this.getdataitem = [];
    this.isItemAvailable = false;
    if(items==null || items==undefined || items ==""){
   this.itemdescription = "";
   this.uom = "";
   this.unitprice = "";
   this.netprice = "";
   this.stockqty ="";
    }

  this.HttpClient.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + "getItemcode" + '/' + items).subscribe((resp: any) => {
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

fetchreconcilation(itemcode: any) {
  debugger
  console.log(itemcode)
  this.itemcode = itemcode;
  this.isItemAvailable = false;
  this.HttpClient.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + "getItemDetail" + '/' + this.itemcode).subscribe((resp: any) => {
    console.log(resp)
    this.getitemdata = resp;
    console.log(this.getitemdata)
    this.Description = this.getitemdata[0].item_short_Desc,
      this.unitprice = this.getitemdata[0].Price
    this.itemdescription = this.getitemdata[0].item_long_desc,
      this.getitemid = this.getitemdata[0].item_id,
      this.uom = this.getitemdata[0].WeightUOM;
      this.unitprice = this.getitemdata[0].Price;
      this.stockqty = this.getitemdata[0].stock_uom;
  });
}

// orderpriority() {
//   console.log(this.order)
//   if (this.order == "2") //urjent
//   {
//     let getdate = new Date();
//     getdate.setDate(getdate.getDate() + 2);
//     console.log(getdate);
//     this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');
//   }
//   if (this.order == "1") //critical
//   {
//     let getdate = new Date();
//     getdate.setDate(getdate.getDate() + 1);
//     console.log(getdate);
//     this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');
//   }
//   if (this.order == "3") //high
//   {
//     let getdate = new Date();
//     getdate.setDate(getdate.getDate() + 3);
//     console.log(getdate);
//     this.Requiredbefore = this.datePipe.transform(getdate, 'yyyy-MM-dd');

//   }
//   if (this.order == "4") //medium
//   {
//     let getdate = new Date();
//     getdate.setDate(getdate.getDate() + 4);
//     console.log(getdate);
//     this.Requiredbefore = this.datePipe.transform(getdate, 'dd/MM/yyyy');

//   }
//   let getdate = new Date();
//   this.prsdate = this.datePipe.transform(getdate, 'dd/MM/yyyy');
// }


submitdata(){

  let body =
  {
    "mrsdetail": [
      {
        "FUNCTION_ID": this.funtionID,
        "BRANCH_ID": this.branch_ID,
        "mrs_id": "0",
         "MRS_CODE": "0",
         "requested_by":this.requestby,
         "requested_Date":"2022-11-05",
        "REQUEST_REFERENCE": "",
        "REQUEST_REASON": this.reasonrequest,
       "CREATED_BY":this.userID,
       "LST_UPD_BY":this.userID,
       "IPADDRESS":"",
       "flag":"N",
       "STATUS": "",
       "product_id":"0",
       "campaign_id":"0",
       "netamount":"0",
       "Order_Priority":"0",

        "MRSDdetail":this.expenseArray
}
]
  }

this.HttpClient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'MaterialRequistion_Insert_Update', body).
subscribe((res: any) => {
this.materialrequestsearch = res;
console.log(this.materialrequestsearch)
this.materialreqsearch = this.materialrequestsearch.itemDetails;
})
}

netpriced(){


  this.netprice=this.unitprice*this.requestqty
  console.log(this.netprice);

}
}
