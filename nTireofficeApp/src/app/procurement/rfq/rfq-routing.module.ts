import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RFQPage } from './rfq.page';

const routes: Routes = [
  {
    path: '',
    component: RFQPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RFQPageRoutingModule {}
