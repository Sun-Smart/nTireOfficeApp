import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendormasterModelPageRoutingModule } from './vendormaster-model-routing.module';

import { VendormasterModelPage } from './vendormaster-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendormasterModelPageRoutingModule
  ],
  declarations: [VendormasterModelPage]
})
export class VendormasterModelPageModule {}
