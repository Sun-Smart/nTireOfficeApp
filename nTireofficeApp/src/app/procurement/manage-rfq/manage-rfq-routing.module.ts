import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageRfqPage } from './manage-rfq.page';

const routes: Routes = [
  {
    path: '',
    component: ManageRfqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRfqPageRoutingModule {}
