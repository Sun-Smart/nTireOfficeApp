import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantskillsdetailsPage } from './applicantskilssdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantskillsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantskilssdetailsPageRoutingModule {}
