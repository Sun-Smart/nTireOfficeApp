import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
  declarations: [InterLocationTransferPage],
  providers:[DatePipe]
})
export class InterLocationTransferPageModule {}
