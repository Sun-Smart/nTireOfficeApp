import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalChargesPageRoutingModule } from './additional-charges-routing.module';

import { AdditionalChargesPage } from './additional-charges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalChargesPageRoutingModule
  ],
  declarations: [AdditionalChargesPage]
})
export class AdditionalChargesPageModule {}
