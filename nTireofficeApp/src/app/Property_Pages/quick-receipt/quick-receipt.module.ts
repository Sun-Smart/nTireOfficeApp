import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickReceiptPageRoutingModule } from './quick-receipt-routing.module';

import { QuickReceiptPage } from './quick-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickReceiptPageRoutingModule
  ],
  declarations: [QuickReceiptPage]
})
export class QuickReceiptPageModule {}
