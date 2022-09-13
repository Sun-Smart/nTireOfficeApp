import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReapplycoffPage } from './reapplycoff.page';

const routes: Routes = [
  {
    path: '',
    component: ReapplycoffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReapplycoffPageRoutingModule {}
