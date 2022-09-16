import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetreturnPage } from './assetreturn.page';

const routes: Routes = [
  {
    path: '',
    component: AssetreturnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetreturnPageRoutingModule {}
