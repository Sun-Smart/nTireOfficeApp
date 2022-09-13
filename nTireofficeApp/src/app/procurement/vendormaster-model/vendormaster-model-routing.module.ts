import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendormasterModelPage } from './vendormaster-model.page';

const routes: Routes = [
  {
    path: '',
    component: VendormasterModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendormasterModelPageRoutingModule {}
