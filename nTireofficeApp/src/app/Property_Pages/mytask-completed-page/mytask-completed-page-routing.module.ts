import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MytaskCompletedPagePage } from './mytask-completed-page.page';

const routes: Routes = [
  {
    path: '',
    component: MytaskCompletedPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MytaskCompletedPagePageRoutingModule {}
