import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorppconfirmPageRoutingModule } from './vendorppconfirm-routing.module';

import { VendorppconfirmPage } from './vendorppconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorppconfirmPageRoutingModule
  ],
  declarations: [VendorppconfirmPage]
})
export class VendorppconfirmPageModule {}
