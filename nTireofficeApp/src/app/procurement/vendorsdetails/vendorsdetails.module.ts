import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsdetailsPageRoutingModule } from './vendorsdetails-routing.module';

import { VendorsdetailsPage } from './vendorsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorsdetailsPageRoutingModule
  ],
  declarations: [VendorsdetailsPage]
})
export class VendorsdetailsPageModule {}
