import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.page.html',
  styleUrls: ['./upload-invoice.page.scss'],
})
export class UploadInvoicePage implements OnInit {
  dat_valid;
  constructor() { 
    this.dat_valid= {
      currentDate: new Date()
    };
  }

  ngOnInit() {
  }

}
