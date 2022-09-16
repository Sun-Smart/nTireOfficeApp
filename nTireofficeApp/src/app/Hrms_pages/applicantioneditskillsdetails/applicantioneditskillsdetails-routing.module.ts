import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantioneditskillsdetailsPage } from './applicantioneditskillsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantioneditskillsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantioneditskillsdetailsPageRoutingModule {}
