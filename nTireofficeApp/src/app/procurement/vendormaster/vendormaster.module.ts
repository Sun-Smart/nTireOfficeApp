import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendormasterPageRoutingModule } from './vendormaster-routing.module';

import { VendormasterPage } from './vendormaster.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendormasterPageRoutingModule
  ],
  declarations: [VendormasterPage]
})
export class VendormasterPageModule {}
