import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoffsummaryPageRoutingModule } from './coffsummary-routing.module';

import { CoffsummaryPage } from './coffsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoffsummaryPageRoutingModule
  ],
  declarations: [CoffsummaryPage]
})
export class CoffsummaryPageModule {}
