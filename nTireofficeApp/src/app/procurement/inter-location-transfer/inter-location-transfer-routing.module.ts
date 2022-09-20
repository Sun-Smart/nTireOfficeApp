import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterLocationTransferPage } from './inter-location-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: InterLocationTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterLocationTransferPageRoutingModule {}
