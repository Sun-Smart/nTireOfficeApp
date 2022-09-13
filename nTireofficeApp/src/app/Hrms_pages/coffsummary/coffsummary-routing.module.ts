import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffsummaryPage } from './coffsummary.page';

const routes: Routes = [
  {
    path: '',
    component: CoffsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffsummaryPageRoutingModule {}
