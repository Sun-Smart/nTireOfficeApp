import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsemployeesPage } from './pmsemployees.page';

const routes: Routes = [
  {
    path: '',
    component: PmsemployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsemployeesPageRoutingModule {}
