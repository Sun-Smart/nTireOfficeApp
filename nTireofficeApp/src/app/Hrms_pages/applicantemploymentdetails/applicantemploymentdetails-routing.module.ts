import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantemploymentdetailsPage } from './applicantemploymentdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantemploymentdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantemploymentdetailsPageRoutingModule {}
