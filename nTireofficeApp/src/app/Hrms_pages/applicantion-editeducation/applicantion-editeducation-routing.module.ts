import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantionEditeducationPage } from './applicantion-editeducation.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantionEditeducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantionEditeducationPageRoutingModule {}
