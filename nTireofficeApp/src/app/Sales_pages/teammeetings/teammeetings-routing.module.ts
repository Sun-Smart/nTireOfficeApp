import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeammeetingsPage } from './teammeetings.page';

const routes: Routes = [
  {
    path: '',
    component: TeammeetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeammeetingsPageRoutingModule {}
