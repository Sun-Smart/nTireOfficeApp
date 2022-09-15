import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewleadcorporatePage } from './newleadcorporate.page';

const routes: Routes = [
  {
    path: '',
    component: NewleadcorporatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewleadcorporatePageRoutingModule {}
