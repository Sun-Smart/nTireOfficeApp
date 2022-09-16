import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantioneditskillsdetailsPageRoutingModule } from './applicantioneditskillsdetails-routing.module';

import { ApplicantioneditskillsdetailsPage } from './applicantioneditskillsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantioneditskillsdetailsPageRoutingModule
  ],
  declarations: [ApplicantioneditskillsdetailsPage]
})
export class ApplicantioneditskillsdetailsPageModule {}
