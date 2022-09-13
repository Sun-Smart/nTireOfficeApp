import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffRequestPage } from './coff-request.page';

const routes: Routes = [
  {
    path: '',
    component: CoffRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffRequestPageRoutingModule {}
