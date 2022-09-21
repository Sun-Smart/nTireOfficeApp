import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HistotydetailsPageRoutingModule } from './histotydetails-routing.module';

import { HistotydetailsPage } from './histotydetails.page';
const routes: Routes = [
  {
    path: '',
    component: HistotydetailsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistotydetailsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistotydetailsPage]
})
export class HistotydetailsPageModule {}
