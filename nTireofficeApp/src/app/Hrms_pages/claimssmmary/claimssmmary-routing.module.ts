import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimssmmaryPage } from './claimssmmary.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimssmmaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimssmmaryPageRoutingModule {}
