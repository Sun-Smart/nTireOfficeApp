import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MymeetingPage } from './mymeeting.page';

const routes: Routes = [
  {
    path: '',
    component: MymeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MymeetingPageRoutingModule {}
