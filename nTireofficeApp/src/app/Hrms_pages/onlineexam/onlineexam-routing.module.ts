import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineexamPage } from './onlineexam.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineexamPageRoutingModule {}
