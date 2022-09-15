import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsIssueStatusPage } from './pms-issue-status.page';

const routes: Routes = [
  {
    path: '',
    component: PmsIssueStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsIssueStatusPageRoutingModule {}
