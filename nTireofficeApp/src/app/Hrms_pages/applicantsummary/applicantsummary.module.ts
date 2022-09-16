import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantsummaryPageRoutingModule } from './applicantsummary-routing.module';

import { ApplicantsummaryPage } from './applicantsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantsummaryPageRoutingModule
  ],
  declarations: [ApplicantsummaryPage]
})
export class ApplicantsummaryPageModule {}
