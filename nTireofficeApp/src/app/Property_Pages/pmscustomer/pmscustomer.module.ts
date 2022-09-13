import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmscustomerPageRoutingModule } from './pmscustomer-routing.module';

import { PmscustomerPage } from './pmscustomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmscustomerPageRoutingModule
  ],
  declarations: [PmscustomerPage]
})
export class PmscustomerPageModule {}
