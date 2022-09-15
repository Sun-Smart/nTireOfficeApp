import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceuploadPageRoutingModule } from './invoiceupload-routing.module';

import { InvoiceuploadPage } from './invoiceupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceuploadPageRoutingModule
  ],
  declarations: [InvoiceuploadPage]
})
export class InvoiceuploadPageModule {}
