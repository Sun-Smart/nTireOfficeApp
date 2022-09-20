import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvoiceStatusPage } from './view-invoice-status.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInvoiceStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoiceStatusPageRoutingModule {}
