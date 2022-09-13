import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantskilldetailsPageRoutingModule } from './applicantskilldetails-routing.module';

import { ApplicantskilldetailsPage } from './applicantskilldetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantskilldetailsPageRoutingModule
  ],
  declarations: [ApplicantskilldetailsPage]
})
export class ApplicantskilldetailsPageModule {}
