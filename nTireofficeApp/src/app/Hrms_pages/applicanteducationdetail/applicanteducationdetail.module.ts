import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicanteducationdetailPageRoutingModule } from './applicanteducationdetail-routing.module';

import { ApplicanteducationdetailPage } from './applicanteducationdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicanteducationdetailPageRoutingModule
  ],
  declarations: [ApplicanteducationdetailPage]
})
export class ApplicanteducationdetailPageModule {}
