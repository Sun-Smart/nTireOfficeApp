import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetreturnPageRoutingModule } from './assetreturn-routing.module';

import { AssetreturnPage } from './assetreturn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetreturnPageRoutingModule
  ],
  declarations: [AssetreturnPage]
})
export class AssetreturnPageModule {}
