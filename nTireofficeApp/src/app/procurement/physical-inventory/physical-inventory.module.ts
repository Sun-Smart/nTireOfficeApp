import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalInventoryPageRoutingModule } from './physical-inventory-routing.module';

import { PhysicalInventoryPage } from './physical-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalInventoryPageRoutingModule
  ],
  declarations: [PhysicalInventoryPage]
})
export class PhysicalInventoryPageModule {}
