import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatevendorquotPage } from './updatevendorquot.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatevendorquotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatevendorquotPageRoutingModule {}
