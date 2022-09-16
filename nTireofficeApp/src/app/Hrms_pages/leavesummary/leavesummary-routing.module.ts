import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavesummaryPage } from './leavesummary.page';

const routes: Routes = [
  {
    path: '',
    component: LeavesummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesummaryPageRoutingModule {}
