import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtravelexpensedetailsPage } from './addtravelexpensedetails.page';

const routes: Routes = [
  {
    path: '',
    component: AddtravelexpensedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtravelexpensedetailsPageRoutingModule {}
