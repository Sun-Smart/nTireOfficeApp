import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.page.html',
  styleUrls: ['./rfq.page.scss'],
})
export class RFQPage implements OnInit {
  showviewlist:boolean=false
  constructor() { }

  ngOnInit() {
  }
  Submit(){
    this.showviewlist=true
  }

}
