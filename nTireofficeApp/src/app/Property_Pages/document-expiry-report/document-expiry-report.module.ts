import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentExpiryReportPageRoutingModule } from './document-expiry-report-routing.module';

import { DocumentExpiryReportPage } from './document-expiry-report.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentExpiryReportPageRoutingModule
  ],
  declarations: [DocumentExpiryReportPage],
  providers: [ DatePipe,]
})
export class DocumentExpiryReportPageModule {}
