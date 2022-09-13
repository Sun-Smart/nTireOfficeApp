import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalacceptPage } from './approvalaccept.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalacceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalacceptPageRoutingModule {}
