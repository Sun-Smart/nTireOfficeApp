import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReapplyloanPage } from './reapplyloan.page';

const routes: Routes = [
  {
    path: '',
    component: ReapplyloanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReapplyloanPageRoutingModule {}
