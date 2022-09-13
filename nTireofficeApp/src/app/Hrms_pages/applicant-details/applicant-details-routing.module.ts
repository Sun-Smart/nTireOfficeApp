import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantDetailsPage } from './applicant-details.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantDetailsPageRoutingModule {}
