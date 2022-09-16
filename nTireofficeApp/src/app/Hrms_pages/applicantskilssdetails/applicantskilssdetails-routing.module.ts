import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantskilssdetailsPage } from './applicantskilssdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantskilssdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantskilssdetailsPageRoutingModule {}
