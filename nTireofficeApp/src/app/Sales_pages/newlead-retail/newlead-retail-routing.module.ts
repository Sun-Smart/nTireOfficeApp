import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewleadRetailPage } from './newlead-retail.page';

const routes: Routes = [
  {
    path: '',
    component: NewleadRetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewleadRetailPageRoutingModule {}
