import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorpoconfirmPageRoutingModule } from './vendorpoconfirm-routing.module';
import { VendorpoconfirmPage } from './vendorpoconfirm.page';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VendorpoconfirmPageRoutingModule,

  ],
  declarations: [VendorpoconfirmPage],
  providers:[DatePipe]
})
export class VendorpoconfirmPageModule {}
