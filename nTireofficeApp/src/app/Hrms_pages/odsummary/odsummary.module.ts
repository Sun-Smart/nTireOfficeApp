import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdsummaryPageRoutingModule } from './odsummary-routing.module';

import { OdsummaryPage } from './odsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdsummaryPageRoutingModule
  ],
  declarations: [OdsummaryPage]
})
export class OdsummaryPageModule {}
