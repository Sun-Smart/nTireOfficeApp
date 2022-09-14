import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicanteducationdetailsPage } from './applicanteducationdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicanteducationdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicanteducationdetailsPageRoutingModule {}


