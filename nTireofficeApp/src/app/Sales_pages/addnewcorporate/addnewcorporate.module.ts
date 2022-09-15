/* eslint-disable @typescript-eslint/quotes */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AddnewcorporatePageRoutingModule } from './addnewcorporate-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AddnewcorporatePage } from './addnewcorporate.page';
const routes: Routes = [
  {
    path: '',
    component: AddnewcorporatePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewcorporatePageRoutingModule,GooglePlaceModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddnewcorporatePage],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AddnewcorporatePageModule {}
