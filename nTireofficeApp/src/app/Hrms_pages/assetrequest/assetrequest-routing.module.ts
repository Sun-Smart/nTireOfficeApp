import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetrequestPage } from './assetrequest.page';

const routes: Routes = [
  {
    path: '',
    component: AssetrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetrequestPageRoutingModule {}
