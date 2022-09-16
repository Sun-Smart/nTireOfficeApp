import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicanteducationdetailPage } from './applicanteducationdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicanteducationdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicanteducationdetailPageRoutingModule {}
