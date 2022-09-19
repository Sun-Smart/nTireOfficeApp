import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantioneditskillsdetailsPageRoutingModule } from './applicantioneditskillsdetails-routing.module';
import { ApplicationeditskillsdetailsPage } from './applicantioneditskillsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantioneditskillsdetailsPageRoutingModule
  ],
  declarations: [ApplicationeditskillsdetailsPage]
})
export class ApplicantioneditskillsdetailsPageModule {}
