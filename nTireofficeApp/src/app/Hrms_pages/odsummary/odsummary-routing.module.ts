import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdsummaryPage } from './odsummary.page';

const routes: Routes = [
  {
    path: '',
    component: OdsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdsummaryPageRoutingModule {}
