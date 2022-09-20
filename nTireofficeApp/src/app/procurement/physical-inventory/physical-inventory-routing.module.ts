import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalInventoryPage } from './physical-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalInventoryPageRoutingModule {}
