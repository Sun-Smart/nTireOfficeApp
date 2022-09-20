import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadInvoicePageRoutingModule } from './upload-invoice-routing.module';

import { UploadInvoicePage } from './upload-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadInvoicePageRoutingModule
  ],
  declarations: [UploadInvoicePage]
})
export class UploadInvoicePageModule {}
