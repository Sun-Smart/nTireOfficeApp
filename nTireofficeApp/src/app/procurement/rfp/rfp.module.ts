import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RFPPageRoutingModule } from './rfp-routing.module';

import { RFPPage } from './rfp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RFPPageRoutingModule
  ],
  declarations: [RFPPage]
})
export class RFPPageModule {}
