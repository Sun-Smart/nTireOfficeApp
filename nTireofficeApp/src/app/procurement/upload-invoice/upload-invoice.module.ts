import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UploadInvoicePageRoutingModule } from './upload-invoice-routing.module';

import { UploadInvoicePage } from './upload-invoice.page';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 

@NgModule({
  imports: [
    CommonModule,
    
    PdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    UploadInvoicePageRoutingModule
  ],
  declarations: [UploadInvoicePage]
})
export class UploadInvoicePageModule {}
