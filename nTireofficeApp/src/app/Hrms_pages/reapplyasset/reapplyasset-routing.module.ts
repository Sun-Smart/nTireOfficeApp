import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReapplyassetPage } from './reapplyasset.page';

const routes: Routes = [
  {
    path: '',
    component: ReapplyassetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReapplyassetPageRoutingModule {}
