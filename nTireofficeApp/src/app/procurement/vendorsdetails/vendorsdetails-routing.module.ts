import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsdetailsPage } from './vendorsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsdetailsPageRoutingModule {}
