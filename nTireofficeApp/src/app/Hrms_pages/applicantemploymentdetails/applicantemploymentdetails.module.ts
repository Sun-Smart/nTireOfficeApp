import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantemploymentdetailsPageRoutingModule } from './applicantemploymentdetails-routing.module';

import { ApplicantemploymentdetailsPage } from './applicantemploymentdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantemploymentdetailsPageRoutingModule
  ],
  declarations: [ApplicantemploymentdetailsPage]
})
export class ApplicantemploymentdetailsPageModule {}
