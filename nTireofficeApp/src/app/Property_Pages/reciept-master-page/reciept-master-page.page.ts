/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdditionalChargesPage } from '../additional-page/additional-charges/additional-charges.page';
import { PaymentHistoryPage } from '../payment-history/payment-history.page';
import { IpaddressService } from '../../service/ipaddress.service';
@Component({
  selector: 'app-reciept-master-page',
  templateUrl: './reciept-master-page.page.html',
  styleUrls: ['./reciept-master-page.page.scss'],
})
export class RecieptMasterPagePage implements OnInit {
  showDetails: boolean;
  data: any;
  sub: any;
  receiptDetailslist;
  locationcode1: any;
  receiptDetailsGrid;
  // getPropertyCode;


  constructor(private IpaddressService: IpaddressService, private http: HttpClient, private router: Router, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
      // this.getPropertyCode = localStorage.setItem('propertyCode', this.data.property_code);
    });
    console.log(this.data);
    this.getReceiptDetails();
    this.getReceiptDetailsGrid();
  }

  getReceiptDetails() {
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getreceiptdetails/' + this.data.property_id + "/" + this.data.rental_id, {
      headers: options,
    }).subscribe(resp => {
      this.receiptDetailslist = resp;
    });
  }
  getReceiptDetailsGrid() {
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.IpaddressService.ipaddress + this.IpaddressService.serviceurlProperty + 'getreceiptdetailsgrid/' + this.data.property_id + "/" + this.data.rental_id, {
      headers: options,
    }).subscribe(resp => {
      this.receiptDetailsGrid = resp;
    });
  }

  async additionalCharge() {

    const model = await this.modalCtrl.create({

      component: AdditionalChargesPage,
    });
    return await model.present();
  }
  async paymentHistory(data) {
    console.log(data.property_id);
    this.router.navigate(['/payment-history', data.property_id]);
    // const model = await this.modalCtrl.create({

    //   component: PaymentHistoryPage,
    // });
    // return await model.present();
  }

  cancel() {
    this.router.navigate(['/pms-transaction']);
    // return this.modalCtrl.dismiss(null, 'cancel');
  }
  receiptDetails() {
    this.showDetails = !this.showDetails;
  }
}
