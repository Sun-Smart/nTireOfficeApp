import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LetterrequestPage } from './letterrequest.page';

const routes: Routes = [
  {
    path: '',
    component: LetterrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetterrequestPageRoutingModule {}
