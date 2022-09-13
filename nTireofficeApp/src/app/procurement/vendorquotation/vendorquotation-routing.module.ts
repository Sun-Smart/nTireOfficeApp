import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorquotationPage } from './vendorquotation.page';

const routes: Routes = [
  {
    path: '',
    component: VendorquotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorquotationPageRoutingModule {}
