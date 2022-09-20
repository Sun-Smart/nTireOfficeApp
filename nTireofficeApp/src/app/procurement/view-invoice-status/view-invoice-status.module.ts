import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvoiceStatusPageRoutingModule } from './view-invoice-status-routing.module';

import { ViewInvoiceStatusPage } from './view-invoice-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInvoiceStatusPageRoutingModule
  ],
  declarations: [ViewInvoiceStatusPage]
})
export class ViewInvoiceStatusPageModule {}
