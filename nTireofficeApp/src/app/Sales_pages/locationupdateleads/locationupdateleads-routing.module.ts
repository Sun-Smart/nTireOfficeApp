import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationupdateleadsPage } from './locationupdateleads.page';

const routes: Routes = [
  {
    path: '',
    component: LocationupdateleadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationupdateleadsPageRoutingModule {}
