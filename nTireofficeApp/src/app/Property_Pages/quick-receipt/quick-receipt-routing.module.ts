import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickReceiptPage } from './quick-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: QuickReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickReceiptPageRoutingModule {}
