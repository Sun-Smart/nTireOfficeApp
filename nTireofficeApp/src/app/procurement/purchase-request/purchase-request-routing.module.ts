import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseRequestPage } from './purchase-request.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRequestPageRoutingModule {}
