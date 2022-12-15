import { IpaddressService } from './../../service/ipaddress.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.page.html',
  styleUrls: ['./rfq.page.scss'],
})
export class RFQPage implements OnInit {

  showviewlist: boolean = false
  selectAll: boolean = false;
  indeterminateState: boolean;
  checkParent: boolean;
  Checkboxes: any;
  checkboxes: any = [];
  prscode: string;
  itemcode: string;
  fromdate;
  toDate;
  status: string = "Pending";
  bidding: string;
  showRfq: boolean = false;
  showMRFQ: boolean = false;
  showCRFQ: boolean = false;

  erefref
  getresponse: any =[];
  getraisedrfq: any;
  getrfqcancel: any;
  splitted;
  managerfqdetails;
  getresponsestr;
  getresponsenew;requiredbefore: any;
  rfqcode: any;
;
  Checked;
  function;
  branch;
  userID;
  usertype;
  userToken;
  accessToken;
  branchID;
  functionID;
  username;
  lastdate;
  RaisedRFQ :any =[];
  RaisedRFQdetails:any = [];
  itemprscode:any;
  requiredDate:any;
  constructor(private router: Router,private datePipe: DatePipe, private alertController: AlertController, private httpclient: HttpClient, private IpaddressService: IpaddressService) {
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.lastdate = this.datePipe.transform(this.lastdate, 'yyyy-MM-dd');
    console.log(this.lastdate);
    this.status="Pending"
  }
  CheckAllOptions() {
    if (this.checkboxes.every(val => val.checked == true))
      this.checkboxes.forEach(val => { val.checked = false });
    else
      this.checkboxes.forEach(val => { val.checked = true });
  }
  // date(lastdate:any){
  //   debugger;

  //   console.log(this.lastdate)
  // }

  selectAllCheckbox(value) {
    console.log(value);
    // if (value == false) {

    //   this.selectAll = true;
    // }
    // else {
    //   this.selectAll = false;
    // }
  }

  verifyEvent() {
    const allItems = this.Checkboxes.length;
    let selected = 0;
    this.Checkboxes.map(item => {
      if (item.isItemChecked) selected++;
    });
    if (selected > 0 && selected < allItems) {
      // One item is selected among all checkbox elements
      this.indeterminateState = true;
      this.checkParent = false;
    } else if (selected == allItems) {
      // All item selected
      this.checkParent = true;
      this.indeterminateState = false;
    } else {
      // No item is selected
      this.indeterminateState = false;
      this.checkParent = false;
    }
  }


  ngOnInit() {
  }


  Submit() {

    this.showviewlist = true;
    console.log('this.status ', this.status);
    // Status : Pending RFQ


    if (this.prscode == undefined) {
      this.prscode = "";
    }

    if (this.itemcode == undefined) {
      this.itemcode = "";
    }

    if (this.fromdate == undefined) {
      this.fromdate = "";
    }

    if (this.toDate == undefined) {
      this.toDate = "";
    }



    if (this.status == "P") {
      this.showRfq = true;
      this.showMRFQ = false;
      this.showCRFQ = false;

      let body = {
        "functionid": "1",
        "prscode":this.prscode,
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode": this.rfqcode,
        "fromdate": this.fromdate,
        "todate": this.toDate,
        "rfqfromdate": "",
        "rfqtodate": "",
        "status": this.status,
        "mode": "2",
        "pageindex1": 0,
        "pagesize1": 20,
        "sortexpression": "prs_id DESC",
        "alphaname": ""
      }

      this.httpclient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'searchRFQLists', body).subscribe((res: any) => {
        this.getresponse = res;
        console.log("Response", res);
       
      });



    } else if (this.status == "RFQ Raised") {
      this.showMRFQ = true;
      this.showRfq = false;
      this.showCRFQ = false;

      let body = {
        "functionid": "1",
        "prscode": this.prscode,
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode":this.rfqcode||"" ,
        "fromdate": this.fromdate,
        "todate": this.toDate,
        "rfqfromdate": "",
        "rfqtodate": "",
        "status": this.status,
        "mode": "2",
        "pageindex1": 0,
        "pagesize1": 20,
        "sortexpression": "prs_id DESC",
        "alphaname": ""

      }

      this.httpclient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'RaisedRFQDetails', body).subscribe((res: any) => {
        this.getresponse = res;

      });

    } else if (this.status == "A") {
      this.showRfq = false;
      this.showMRFQ = false;
      this.showCRFQ = true;

      // if (this.status == "Pending") {
      //   this.status = "P"
      // }

      // if (this.status == "RFQ") {
      //   this.status = "RFQ Raised";
      // }

      // if (this.status == "Cancelled") {
      //   this.status = "A";
      // }

      let body = {
        "functionid": "1",
        "prscode":  this.prscode,
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode": this.rfqcode,
        "fromdate": this.fromdate,
        "todate": this.toDate,
        "status": this.status,
        "mode": "2",
        "pageindex1": 0,
        "pagesize1": 20,
        // "sortexpression": "prs_id DESC",
        "alphaname": ""
      }

      this.httpclient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'CancelledRFQDetails', body).subscribe((res: any) => {
        this.getrfqcancel = res;
        console.log("Response", res);
      });
    }
  }


  
  test(){
    // alert("ih")
    // console.log(e.target.value)
    console.log(this.lastdate)
   

  }

  getVal(item: string) {
    console.log(item);
    // if (item == "Pending") {
    //   this.showMRFQ = false;
    //   this.showRfq = false;
    //   this.showCRFQ = false;
    // }
    // else if (item == "RFQ") {
    //   this.showMRFQ = false;
    //   this.showRfq = false;
    //   this.showCRFQ = false;
    // } else if (item == "Cancelled") {
    //   this.showMRFQ = false;
    //   this.showRfq = false;
    //   this.showCRFQ = false;
    // }
  }

  fieldsChange(values:any,item:any):void {
    debugger;
    this.itemprscode=item.prs_code;
    console.log(this.itemprscode)
    // this.requiredDate = item.RequiredBefore;
    console.log(values.currentTarget.checked);
    this.Checked = values.currentTarget.checked;
    console.log(item);

  this.test()
    if(this.Checked == true ){
if(this.RaisedRFQ.length == 0){
  this.RaisedRFQ.push({
        
    "ROW_NUM":item.ROW_NUM,
    "rowid": item.rowid,
    "RFQCode1": item.RFQCode1,
    "RFQ_Date": this.lastdate,
    "RFQCode2": item.RFQCode2,
    "RFQID": item.RFQID,
    "prs_id": item.prs_id,
    "branch_id": item.branch_id,
    "prs_category": item.prs_category,
    "IS_SINGLE_VENDOR": item.IS_SINGLE_VENDOR,
    "prs_code": item.prs_code,
    "item_id": item.item_id,
    "item_short_Desc": item.item_short_Desc,
    "item_Code": item.item_Code,
    "uomtext": item.uomtext,
    "uomval": item.uomval,
    "required_qty": item.required_qty,
    "requested_Date": item.requested_Date,
    "request_comments": item.request_comments,
    "RFQCode": item.RFQCode,
    "ItemDescription": item.ItemDescription,
    "RequiredBefore": this.lastdate,
    "RFQDate": this.lastdate,
    "Type": item.Type,
    "ISBid": "Y",
    "Auction_status": item.Auction_status,
    "GRIDVIEWCOUNT": item.GRIDVIEWCOUNT,
    "Created_by": this.userID
  
});
console.log(this.RaisedRFQ);
}else{
  if(this.itemprscode == this.RaisedRFQ[0].prs_code){
    this.RaisedRFQ.push({
        
      "ROW_NUM":item.ROW_NUM,
      "rowid": item.rowid,
      "RFQCode1": item.RFQCode1,
      "RFQ_Date": this.lastdate,
      "RFQCode2": item.RFQCode2,
      "RFQID": item.RFQID,
      "prs_id": item.prs_id,
      "branch_id": item.branch_id,
      "prs_category": item.prs_category,
      "IS_SINGLE_VENDOR": item.IS_SINGLE_VENDOR,
      "prs_code": item.prs_code,
      "item_id": item.item_id,
      "item_short_Desc": item.item_short_Desc,
      "item_Code": item.item_Code,
      "uomtext": item.uomtext,
      "uomval": item.uomval,
      "required_qty": item.required_qty,
      "requested_Date": item.requested_Date,
      "request_comments": item.request_comments,
      "RFQCode": item.RFQCode,
      "ItemDescription": item.ItemDescription,
      "RequiredBefore": this.lastdate,
      "RFQDate": this.lastdate,
      "Type": item.Type,
      "ISBid": "Y",
      "Auction_status": item.Auction_status,
      "GRIDVIEWCOUNT": item.GRIDVIEWCOUNT,
      "Created_by": this.userID
    
  });
  console.log(this.RaisedRFQ);
  }
  else{
    this.presentAlert('Alert','PRS Code Should be same');
  }
}
}
   
   
     
      var index = this.RaisedRFQ.indexOf(item);
      if(index > -1){
        this.RaisedRFQ.splice(index,1)
        console.log(this.RaisedRFQ,'filterarray');
      }


  
  }

  raiseRFQ(item : any) {
    console.log(this.lastdate)
    debugger;
    console.log(item);
    console.log(this.RaisedRFQ)
    this.requiredDate = this.RaisedRFQ[0].RequiredBefore;
   if(this.lastdate <= this.requiredDate){
    let body ={
      "RFQ_raise":[
        {
          "RFQ_details":this.RaisedRFQ
        }
      ]
    }
   
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpclient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'RaiseRFQ',body,{
      headers: options, responseType: 'text'
    }).subscribe((res: any) => {

        this.getraisedrfq = res;
        console.log(this.getraisedrfq)
        // this.showrfq = true;
        this.showviewlist = false;
     
        this.presentAlert("", res);
        this.RaisedRFQ =[];
      });
   }else{
    this.presentAlert('Alert',"last date should less then required before date")
   }
    
  
    
    // this.RaisedRFQdetails = this.RaisedRFQ;
    console.log(this.RaisedRFQdetails);
    // for(let i=0; i< this.RaisedRFQ.length; i++) {
    //   this.RaisedRFQ[i]['Created_by'] = this.userID;
      // this.RaisedRFQ[i]['']
    
    // }
   
  }
  manageRFQlink(item:any) {
    console.log('New Item',item)
    var str =item ;
        console.log(str)
        this.splitted = str.split('/');
        console.log(this.splitted);
       this.splitted = this.splitted[1];
        console.log('new',this.splitted)

     this.router.navigate(['/manage-rfq',this.splitted,item])
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

  async Cancel() {
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
            this.prscode = "";
            this.itemcode = "";
            this.fromdate = "";
            this.toDate = "";
            this.status = "";
            this.bidding = "";
            // this.remarks="";
            this.getresponse = [];
          }
        }
      ]
    });

    await alert.present();
  }
}
