import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyapprovalsPage } from './myapprovals.page';

const routes: Routes = [
  {
    path: '',
    component: MyapprovalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyapprovalsPageRoutingModule {}
