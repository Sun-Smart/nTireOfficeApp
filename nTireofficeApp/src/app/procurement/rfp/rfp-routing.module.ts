import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RFPPage } from './rfp.page';

const routes: Routes = [
  {
    path: '',
    component: RFPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RFPPageRoutingModule {}
