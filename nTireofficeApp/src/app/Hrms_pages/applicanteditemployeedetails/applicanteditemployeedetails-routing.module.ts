import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicanteditemployeedetailsPage } from './applicanteditemployeedetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicanteditemployeedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicanteditemployeedetailsPageRoutingModule {}
