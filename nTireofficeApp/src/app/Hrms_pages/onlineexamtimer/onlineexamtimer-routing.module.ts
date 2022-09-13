import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineexamtimerPage } from './onlineexamtimer.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineexamtimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineexamtimerPageRoutingModule {}
