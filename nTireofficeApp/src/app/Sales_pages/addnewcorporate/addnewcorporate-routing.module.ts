import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewcorporatePage } from './addnewcorporate.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewcorporatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewcorporatePageRoutingModule {}
