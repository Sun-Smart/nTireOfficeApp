import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantskilssdetailsPageRoutingModule } from './applicantskilssdetails-routing.module';

import { ApplicantskilssdetailsPage } from './applicantskilssdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantskilssdetailsPageRoutingModule
  ],
  declarations: [ApplicantskilssdetailsPage]
})
export class ApplicantskilssdetailsPageModule {}
