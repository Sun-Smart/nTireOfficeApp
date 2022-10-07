import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyCondactListPage } from './property-condact-list.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyCondactListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyCondactListPageRoutingModule {}
