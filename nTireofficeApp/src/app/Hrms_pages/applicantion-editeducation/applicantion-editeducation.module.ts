import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantionEditeducationPageRoutingModule } from './applicantion-editeducation-routing.module';

import { ApplicantionEditeducationPage } from './applicantion-editeducation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantionEditeducationPageRoutingModule
  ],
  declarations: [ApplicantionEditeducationPage]
})
export class ApplicantionEditeducationPageModule {}
