import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineexamreportsPage } from './onlineexamreports.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineexamreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineexamreportsPageRoutingModule {}
