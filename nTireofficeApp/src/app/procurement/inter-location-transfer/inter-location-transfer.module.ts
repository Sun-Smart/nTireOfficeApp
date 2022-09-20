import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterLocationTransferPageRoutingModule } from './inter-location-transfer-routing.module';

import { InterLocationTransferPage } from './inter-location-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterLocationTransferPageRoutingModule
  ],
  declarations: [InterLocationTransferPage]
})
export class InterLocationTransferPageModule {}
