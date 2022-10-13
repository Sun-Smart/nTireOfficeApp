import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.page.html',
  styleUrls: ['./rfq.page.scss'],
})
export class RFQPage implements OnInit {

  showviewlist:boolean=false
  showrfq:boolean=false
  selectAll:boolean = false;

  indeterminateState: boolean;
  checkParent: boolean;
  Checkboxes: any;
  checkboxes:any=[];

  constructor(private router :Router) {
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
    if(value == false) {
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
  Submit(){
    this.showviewlist=true
  }
  raiseRFQ(){
    this.showrfq=true
    this.showviewlist=false
  }
  manageRFQlink(){
    this.router.navigate(['/manage-rfq'])
  }

}
