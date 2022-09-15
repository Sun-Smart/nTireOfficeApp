import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorpoconfirmPage } from './vendorpoconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: VendorpoconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorpoconfirmPageRoutingModule {}
