import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenaddemploymentpagePage } from './openaddemploymentpage.page';

const routes: Routes = [
  {
    path: '',
    component: OpenaddemploymentpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenaddemploymentpagePageRoutingModule {}
