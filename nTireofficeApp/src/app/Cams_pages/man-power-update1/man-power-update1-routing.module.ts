import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManPowerUpdate1Page } from './man-power-update1.page';

const routes: Routes = [
  {
    path: '',
    component: ManPowerUpdate1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManPowerUpdate1PageRoutingModule {}
