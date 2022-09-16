import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimssummaryPage } from './claimssummary.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimssummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimssummaryPageRoutingModule {}
