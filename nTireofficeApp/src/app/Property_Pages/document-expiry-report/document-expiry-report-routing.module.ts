import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentExpiryReportPage } from './document-expiry-report.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentExpiryReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentExpiryReportPageRoutingModule {}
