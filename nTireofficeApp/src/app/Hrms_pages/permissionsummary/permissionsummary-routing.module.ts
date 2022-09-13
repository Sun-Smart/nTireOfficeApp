import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsummaryPage } from './permissionsummary.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsummaryPageRoutingModule {}
