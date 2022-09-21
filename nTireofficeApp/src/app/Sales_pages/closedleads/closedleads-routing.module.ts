import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClosedleadsPage } from './closedleads.page';

const routes: Routes = [
  {
    path: '',
    component: ClosedleadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClosedleadsPageRoutingModule {}
