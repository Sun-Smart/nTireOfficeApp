import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorpaymentsPageRoutingModule } from './vendorpayments-routing.module';

import { VendorpaymentsPage } from './vendorpayments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VendorpaymentsPageRoutingModule
  ],
  declarations: [VendorpaymentsPage]
})
export class VendorpaymentsPageModule {}
