/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {
  historyDetailslist: any;
  sub: any;
  data: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalCtrl: ModalController, private IpaddressService: IpaddressService, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
    });
    console.log(this.data);
    this.getReceiptDetails();
  }
  cancel() {
    // return this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigate(['/pms-transaction']);
  }
  getReceiptDetails() {
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getpaymenthistorydetailsgrid/' + this.data.propertyid, {
      headers: options,
    }).subscribe(resp => {
      this.historyDetailslist = resp;
      console.log(this.historyDetailslist);
    });
  }
}
