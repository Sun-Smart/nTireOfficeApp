import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantskilldetailsPage } from './applicantskilldetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantskilldetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantskilldetailsPageRoutingModule {}
