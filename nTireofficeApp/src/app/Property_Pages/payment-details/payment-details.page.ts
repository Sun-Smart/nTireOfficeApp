import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {
  showfilter:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  togglefilter(){
    this.showfilter = !this.showfilter
  }
}
