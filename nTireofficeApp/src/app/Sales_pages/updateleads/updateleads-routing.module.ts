import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateleadsPage } from './updateleads.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateleadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateleadsPageRoutingModule {}
