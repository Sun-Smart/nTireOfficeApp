import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineexamportalPage } from './onlineexamportal.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineexamportalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineexamportalPageRoutingModule {}
