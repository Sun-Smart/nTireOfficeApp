import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimssummaryPageRoutingModule } from './claimssummary-routing.module';

import { ClaimssummaryPage } from './claimssummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimssummaryPageRoutingModule
  ],
  declarations: [ClaimssummaryPage]
})
export class ClaimssummaryPageModule {}
