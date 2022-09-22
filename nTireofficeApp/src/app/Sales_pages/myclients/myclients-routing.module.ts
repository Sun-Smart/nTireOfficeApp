import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyclientsPage } from './myclients.page';

const routes: Routes = [
  {
    path: '',
    component: MyclientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyclientsPageRoutingModule {}
