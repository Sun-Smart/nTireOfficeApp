import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimsrequestPage } from './claimsrequest.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimsrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsrequestPageRoutingModule {}
