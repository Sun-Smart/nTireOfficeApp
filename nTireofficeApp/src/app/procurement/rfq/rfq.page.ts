import { IpaddressService } from './../../service/ipaddress.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';

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
  getresponsenew;;
  Checked;
  RaisedRFQ :any =[];
  RaisedRFQdetails:any = [];
  constructor(private router: Router, private alertController: AlertController, private httpclient: HttprequestService, private IpaddressService: IpaddressService) {
    // this.Checkboxes = [
    //   {
    //     name: "PRS Code",
    //     prscode: "PRS573864533464",
    //     itemcode: "7865",
    //     requisitiondate: "12/09/2020",
    //     isItemChecked: false
    //   }, {
    //     name: "PRS Code",
    //     prscode: "PRS573864533464",
    //     itemcode: "7865",
    //     requisitiondate: "12/09/2020",
    //     isItemChecked: false
    //   }, {
    //     name: "PRS Code",
    //     prscode: "PRS573864533464",
    //     itemcode: "7865",
    //     requisitiondate: "12/09/2020",
    //     isItemChecked: false
    //   }, {
    //     name: "PRS Code",
    //     prscode: "PRS573864533464",
    //     itemcode: "7865",
    //     requisitiondate: "12/09/2020",
    //     isItemChecked: false
    //   }
    // ];
  }
  CheckAllOptions() {
    if (this.checkboxes.every(val => val.checked == true))
      this.checkboxes.forEach(val => { val.checked = false });
    else
      this.checkboxes.forEach(val => { val.checked = true });
  }

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
      this.fromdate = "0";
    }

    if (this.toDate == undefined) {
      this.toDate = "0";
    }



    if (this.status == "P") {
      this.showRfq = true;
      this.showMRFQ = false;
      this.showCRFQ = false;

      // if (this.status == "P") {
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
        "prscode": "",
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode": this.prscode,
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

      this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'searchRFQLists', body).then((res: any) => {
        this.getresponse = res;
        console.log("Response", res);
      });



    } else if (this.status == "RFQ Raised") {
      this.showMRFQ = true;
      this.showRfq = false;
      this.showCRFQ = false;

      let body = {
        "functionid": "1",
        "prscode": "",
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode": this.prscode,
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

      this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'RaisedRFQDetails', body).then((res: any) => {
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
        "prscode": "",
        "itemcode": this.itemcode,
        "reuestdate": "",
        "rfqcode": this.prscode,
        "fromdate": this.fromdate,
        "todate": this.toDate,
        "status": this.status,
        "mode": "2",
        "pageindex1": 0,
        "pagesize1": 20,
        // "sortexpression": "prs_id DESC",
        "alphaname": ""
      }

      this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'CancelledRFQDetails', body).then((res: any) => {
        this.getrfqcancel = res;
        console.log("Response", res);
      });
    }
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
    console.log(values.currentTarget.checked);
    this.Checked = values.currentTarget.checked;
    console.log(item);

    if(this.Checked == true){
      this.RaisedRFQ.push(item);
      console.log(this.RaisedRFQ);
    }
    else {
      var index = this.RaisedRFQ.indexOf(item);
      if(index > -1){
        this.RaisedRFQ.splice(index,1)
        console.log(this.RaisedRFQ,'filterarray');
      }


    }
  }

  raiseRFQ(item : any) {
    console.log(item);
    this.RaisedRFQdetails = this.RaisedRFQ;
    console.log(this.RaisedRFQdetails);
    let body ={
      "vendordetail" : this.RaisedRFQdetails
    }
    // this.presentAlert("", "RFQ 345/AT Raised Successfully");
    // Raise RFQ Button
    this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'RaiseRFQ',body).then((res: any) => {
        this.getraisedrfq = res;
        console.log(this.getraisedrfq)
        // this.showrfq = true;
        this.showviewlist = false;
        // this.presentAlert("", "RFQ 345/AT Raised Successfully");
      });
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
