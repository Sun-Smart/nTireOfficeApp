import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsListPage } from './pms-list.page';

const routes: Routes = [
  {
    path: '',
    component: PmsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsListPageRoutingModule {}
