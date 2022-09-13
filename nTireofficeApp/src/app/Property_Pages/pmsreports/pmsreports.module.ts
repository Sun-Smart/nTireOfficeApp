import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsreportsPageRoutingModule } from './pmsreports-routing.module';

import { PmsreportsPage } from './pmsreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsreportsPageRoutingModule
  ],
  declarations: [PmsreportsPage]
})
export class PmsreportsPageModule {}
