import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanSummaryPageRoutingModule } from './loan-summary-routing.module';

import { LoanSummaryPage } from './loan-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanSummaryPageRoutingModule
  ],
  declarations: [LoanSummaryPage]
})
export class LoanSummaryPageModule {}
