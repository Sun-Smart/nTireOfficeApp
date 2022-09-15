import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorpaymentsPage } from './vendorpayments.page';

const routes: Routes = [
  {
    path: '',
    component: VendorpaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorpaymentsPageRoutingModule {}
