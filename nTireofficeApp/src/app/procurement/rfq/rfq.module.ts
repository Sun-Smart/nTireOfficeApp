import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RFQPageRoutingModule } from './rfq-routing.module';

import { RFQPage } from './rfq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RFQPageRoutingModule
  ],
  declarations: [RFQPage]
})
export class RFQPageModule {}
