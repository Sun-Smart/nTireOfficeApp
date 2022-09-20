import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseRequestPageRoutingModule } from './purchase-request-routing.module';

import { PurchaseRequestPage } from './purchase-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseRequestPageRoutingModule
  ],
  declarations: [PurchaseRequestPage]
})
export class PurchaseRequestPageModule {}
