import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetssummaryPage } from './assetssummary.page';

const routes: Routes = [
  {
    path: '',
    component: AssetssummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetssummaryPageRoutingModule {}
