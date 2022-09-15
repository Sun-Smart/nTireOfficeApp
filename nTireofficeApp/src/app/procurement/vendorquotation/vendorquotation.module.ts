import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorquotationPageRoutingModule } from './vendorquotation-routing.module';

import { VendorquotationPage } from './vendorquotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorquotationPageRoutingModule
  ],
  declarations: [VendorquotationPage]
})
export class VendorquotationPageModule {}
