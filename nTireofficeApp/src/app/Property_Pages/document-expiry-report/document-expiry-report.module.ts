import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentExpiryReportPageRoutingModule } from './document-expiry-report-routing.module';

import { DocumentExpiryReportPage } from './document-expiry-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentExpiryReportPageRoutingModule
  ],
  declarations: [DocumentExpiryReportPage]
})
export class DocumentExpiryReportPageModule {}
