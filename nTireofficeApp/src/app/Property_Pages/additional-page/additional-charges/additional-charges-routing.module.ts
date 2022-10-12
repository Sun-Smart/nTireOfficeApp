import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalChargesPage } from './additional-charges.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalChargesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalChargesPageRoutingModule {}
