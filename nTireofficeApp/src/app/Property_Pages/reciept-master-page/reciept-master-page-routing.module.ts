import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecieptMasterPagePage } from './reciept-master-page.page';

const routes: Routes = [
  {
    path: '',
    component: RecieptMasterPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecieptMasterPagePageRoutingModule {}
