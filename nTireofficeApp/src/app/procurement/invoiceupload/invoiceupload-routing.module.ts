import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceuploadPage } from './invoiceupload.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceuploadPageRoutingModule {}
