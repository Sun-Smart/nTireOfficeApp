import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorpendingQuotationsPage } from './vendorpending-quotations.page';

const routes: Routes = [
  {
    path: '',
    component: VendorpendingQuotationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorpendingQuotationsPageRoutingModule {}
