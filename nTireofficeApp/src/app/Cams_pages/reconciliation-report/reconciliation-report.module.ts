import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReconciliationReportPage } from './reconciliation-report.page';

const routes: Routes = [
  {
    path: '',
    component: ReconciliationReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReconciliationReportPage]
})
export class ReconciliationReportPageModule {}
