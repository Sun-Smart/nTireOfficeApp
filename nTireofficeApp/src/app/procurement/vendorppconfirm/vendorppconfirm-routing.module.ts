import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorppconfirmPage } from './vendorppconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: VendorppconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorppconfirmPageRoutingModule {}
