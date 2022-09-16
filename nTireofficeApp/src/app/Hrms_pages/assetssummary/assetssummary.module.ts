import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetssummaryPageRoutingModule } from './assetssummary-routing.module';

import { AssetssummaryPage } from './assetssummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetssummaryPageRoutingModule
  ],
  declarations: [AssetssummaryPage]
})
export class AssetssummaryPageModule {}
