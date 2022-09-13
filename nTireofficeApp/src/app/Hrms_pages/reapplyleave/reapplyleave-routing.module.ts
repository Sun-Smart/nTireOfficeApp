import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReapplyleavePage } from './reapplyleave.page';

const routes: Routes = [
  {
    path: '',
    component: ReapplyleavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReapplyleavePageRoutingModule {}
