import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsitemsPageRoutingModule } from './vendorsitems-routing.module';

import { VendorsitemsPage } from './vendorsitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorsitemsPageRoutingModule
  ],
  declarations: [VendorsitemsPage]
})
export class VendorsitemsPageModule {}
