import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorpendingQuotationsPageRoutingModule } from './vendorpending-quotations-routing.module';

import { VendorpendingQuotationsPage } from './vendorpending-quotations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorpendingQuotationsPageRoutingModule
  ],
  declarations: [VendorpendingQuotationsPage]
})
export class VendorpendingQuotationsPageModule {}
