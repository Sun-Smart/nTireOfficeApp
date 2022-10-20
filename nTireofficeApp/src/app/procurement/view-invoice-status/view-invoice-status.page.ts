import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-invoice-status',
  templateUrl: './view-invoice-status.page.html',
  styleUrls: ['./view-invoice-status.page.scss'],
})
export class ViewInvoiceStatusPage implements OnInit {
  dat_valid;
  constructor() { 
    this.dat_valid= {
      currentDate: new Date()
    };
  }

  ngOnInit() {
  }
  close(){
    
  }
}
