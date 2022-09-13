import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DenyScreenPage } from './deny-screen.page';

const routes: Routes = [
  {
    path: '',
    component: DenyScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DenyScreenPageRoutingModule {}
