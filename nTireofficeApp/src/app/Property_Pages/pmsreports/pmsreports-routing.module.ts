import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsreportsPage } from './pmsreports.page';

const routes: Routes = [
  {
    path: '',
    component: PmsreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsreportsPageRoutingModule {}
