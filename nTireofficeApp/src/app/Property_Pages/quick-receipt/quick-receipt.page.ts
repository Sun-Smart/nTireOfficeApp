import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-receipt',
  templateUrl: './quick-receipt.page.html',
  styleUrls: ['./quick-receipt.page.scss'],
})
export class QuickReceiptPage implements OnInit {
  showfilter: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  togglefilter(){
    this.showfilter = !this.showfilter
  }
}
