import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReapplypermissionPage } from './reapplypermission.page';

const routes: Routes = [
  {
    path: '',
    component: ReapplypermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReapplypermissionPageRoutingModule {}
