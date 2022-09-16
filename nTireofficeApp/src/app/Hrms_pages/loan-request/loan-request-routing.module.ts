import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanRequestPage } from './loan-request.page';

const routes: Routes = [
  {
    path: '',
    component: LoanRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRequestPageRoutingModule {}
