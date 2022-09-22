import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensedetailsPage } from './expensedetails.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensedetailsPageRoutingModule {}
