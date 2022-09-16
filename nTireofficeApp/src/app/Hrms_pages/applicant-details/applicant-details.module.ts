import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantDetailsPageRoutingModule } from './applicant-details-routing.module';

import { ApplicantDetailsPage } from './applicant-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantDetailsPageRoutingModule
  ],
  declarations: [ApplicantDetailsPage]
})
export class ApplicantDetailsPageModule {}
