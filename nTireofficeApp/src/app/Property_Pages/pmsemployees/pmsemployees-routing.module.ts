import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmsemployeesPage } from './pmsemployees.page';

const routes: Routes = [
  {
    path: '',
    component: PmsemployeesPage
  },
  {
    path: 'additional-charges',
    loadChildren: () => import('../additional-page/additional-charges/additional-charges.module').then( m => m.AdditionalChargesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsemployeesPageRoutingModule {}
