import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamdetailsPage } from './examdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ExamdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamdetailsPageRoutingModule {}
