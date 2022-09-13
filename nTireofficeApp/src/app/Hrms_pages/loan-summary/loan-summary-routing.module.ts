import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanSummaryPage } from './loan-summary.page';

const routes: Routes = [
  {
    path: '',
    component: LoanSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanSummaryPageRoutingModule {}
