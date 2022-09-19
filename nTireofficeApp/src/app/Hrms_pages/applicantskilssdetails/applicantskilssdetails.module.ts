// import { ApplicantskilssdetailsPageModule } from '../applicantskilssdetails/applicantskilssdetails.page';
import { ApplicantDetailsPage } from './../applicant-details/applicant-details.page';
import { ApplicantskillsdetailsPage } from './applicantskilssdetails.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicantskilssdetailsPageRoutingModule } from './applicantskilssdetails-routing.module';
// import { ApplicantskilssdetailsPage } from '../applicantskilssdetails/applicantskilssdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantskilssdetailsPageModule,
    ApplicantskilssdetailsPageRoutingModule
  ],
  declarations: [ApplicantskillsdetailsPage]
})
export class ApplicantskilssdetailsPageModule {}
