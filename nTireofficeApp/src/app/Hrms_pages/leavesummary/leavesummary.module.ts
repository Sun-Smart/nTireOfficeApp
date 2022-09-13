import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeavesummaryPageRoutingModule } from './leavesummary-routing.module';

import { LeavesummaryPage } from './leavesummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeavesummaryPageRoutingModule
  ],
  declarations: [LeavesummaryPage]
})
export class LeavesummaryPageModule {}
