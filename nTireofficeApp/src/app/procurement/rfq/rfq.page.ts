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
  showrfq: boolean = false
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
  getresponse: any;
  constructor(private router: Router, private alertController: AlertController, private httpclient : HttprequestService, private IpaddressService : IpaddressService ) {
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
    if (value == false) {
      this.selectAll = true;
    }
    else {
      this.selectAll = false;
    }
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
    console.log('this.status ',this.status);
     if (this.status == "Pending") {
      this.showRfq = true;
      this.showMRFQ = false;
      this.showCRFQ = false;
    } else if (this.status == "RFQ") {
      this.showMRFQ = true;
      this.showRfq = false;
      this.showCRFQ = false;
    } else if (this.status == "Cancelled") {
      this.showRfq = false;
      this.showMRFQ = false;
      this.showCRFQ = true;
    }

    if (this.status == "Pending") {
      this.status="P"
    }

    if (this.status == "RFQ") {
      this.status = "";
    }

    if (this.status == "Cancelled")
    {
      this.status= "A";
    }


    if( this.prscode == undefined)
    {
      this.prscode = "";
    }

if( this.itemcode == undefined)
{
  this.itemcode = "";
}

if( this.fromdate == undefined)
{
  this.fromdate ="0";
}

if( this.toDate == undefined)
{
  this.toDate = "0";
}



    let body = {
    "functionid":"1",
    "prscode":"",
    "itemcode": this.itemcode,
    "reuestdate":"",
    "rfqcode": this.prscode,
    "fromdate": this.fromdate,
    "todate": this.toDate,
    "rfqfromdate":"",
    "rfqtodate":"",
    "status": this.status,
    "mode":"2",
    "pageindex1":0,
    "pagesize1":20,
    "sortexpression":"prs_id DESC",
    "alphaname":""
    }

    this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'searchRFQLists', body ).then((res: any) => {
      // this.loading = false
      this.getresponse = res;


      console.log("Response", res);
      // for (let item of this.getresponse) {
      //   console.log(item);
      // }
    });


this.httpclient.GetRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'getraiserfq').
then((res:any) => {
this.getresponse = res;
});


  }
  getVal(item: string) {
    console.log(item);
    if (item == "Pending") {
      this.showMRFQ = false;
      this.showRfq = false;
      this.showCRFQ = false;
    }
    else if (item == "RFQ") {
      this.showMRFQ = false;
      this.showRfq = false;
      this.showCRFQ = false;
    } else if (item == "Cancelled") {
      this.showMRFQ = false;
      this.showRfq = false;
      this.showCRFQ = false;
    }
  }


  raiseRFQ() {
    this.showrfq = true;
    this.showviewlist = false;
    this.presentAlert("", "RFQ 345/AT Raised Successfully");
  }
  manageRFQlink() {
    this.router.navigate(['/manage-rfq'])
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

          }
        }
      ]
    });

    await alert.present();
  }
}
