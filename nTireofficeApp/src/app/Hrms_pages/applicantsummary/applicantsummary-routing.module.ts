import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantsummaryPage } from './applicantsummary.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantsummaryPageRoutingModule {}
