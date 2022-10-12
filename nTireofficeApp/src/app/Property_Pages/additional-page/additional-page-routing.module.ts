import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalPagePage } from './additional-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalPagePageRoutingModule {}
