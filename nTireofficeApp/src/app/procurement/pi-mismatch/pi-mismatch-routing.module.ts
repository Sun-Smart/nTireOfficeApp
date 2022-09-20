import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiMismatchPage } from './pi-mismatch.page';

const routes: Routes = [
  {
    path: '',
    component: PiMismatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiMismatchPageRoutingModule {}
