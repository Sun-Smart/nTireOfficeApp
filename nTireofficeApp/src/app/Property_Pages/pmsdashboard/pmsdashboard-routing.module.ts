import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsdashboardPage } from './pmsdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PmsdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsdashboardPageRoutingModule {}
