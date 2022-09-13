import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsitemsPage } from './vendorsitems.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsitemsPageRoutingModule {}
