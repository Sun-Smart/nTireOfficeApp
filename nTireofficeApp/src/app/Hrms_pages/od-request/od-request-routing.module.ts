import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdRequestPage } from './od-request.page';

const routes: Routes = [
  {
    path: '',
    component: OdRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdRequestPageRoutingModule {}
