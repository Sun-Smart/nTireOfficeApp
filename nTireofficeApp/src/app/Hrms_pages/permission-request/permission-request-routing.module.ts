import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionRequestPage } from './permission-request.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRequestPageRoutingModule {}
