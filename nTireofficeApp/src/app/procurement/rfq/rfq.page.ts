import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


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
  fromdate: string;
  toDate: string;
  status: string = "Pending";
  bidding: string;
  showRfq: boolean = false;
  showMRFQ: boolean = false;
  showCRFQ: boolean = false;


  constructor(private router: Router, private alertController: AlertController) {
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

  }
  getVal(item: string) {
    console.log(item);
    // if (item == "Pending") {
    //   this.showRfq = true;
    //   this.showMRFQ = false
    // } else if (item == "RFQ") {
    //   this.showMRFQ = true;
    //   this.showRfq = false;
    // } else if (item == "Cancelled") {
    //   this.showRfq = false;
    //   this.showMRFQ = false;
    // }
  }
  // getVal(item: string) {
  //   console.log(item)
  //   // let item1 = this.status
  //   // if (item == "Cancelled") {
  //   //   this.showRfq = false;
  //   //   this.showMRFQ = false;
  //   //   // alert('No Records Found');
  //   // }
  //   // if (item == "Pending") {
  //   //   this.showRfq = true;
  //   //   this.showMRFQ = false
  //   // }
  //   // if (item == "RFQ") {
  //   //   this.showMRFQ = true;
  //   //   this.showRfq = false;
  //   // }
  // }
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
