import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PRSstatusPage } from './prsstatus.page';

const routes: Routes = [
  {
    path: '',
    component: PRSstatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PRSstatusPageRoutingModule {}
