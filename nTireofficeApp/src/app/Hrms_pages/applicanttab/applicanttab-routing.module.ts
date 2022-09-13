import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicanttabPage } from './applicanttab.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicanttabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicanttabPageRoutingModule {}
