import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorpoconfirmPageRoutingModule } from './vendorpoconfirm-routing.module';
import { VendorpoconfirmPage } from './vendorpoconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorpoconfirmPageRoutingModule,

  ],
  declarations: [VendorpoconfirmPage]
})
export class VendorpoconfirmPageModule {}
