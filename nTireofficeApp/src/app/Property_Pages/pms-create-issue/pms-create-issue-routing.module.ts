import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsCreateIssuePage } from './pms-create-issue.page';

const routes: Routes = [
  {
    path: '',
    component: PmsCreateIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsCreateIssuePageRoutingModule {}
