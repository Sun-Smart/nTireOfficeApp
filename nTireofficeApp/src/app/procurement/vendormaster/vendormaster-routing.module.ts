import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendormasterPage } from './vendormaster.page';

const routes: Routes = [
  {
    path: '',
    component: VendormasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendormasterPageRoutingModule {}
