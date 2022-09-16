import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenAddEducationPage } from './open-add-education.page';

const routes: Routes = [
  {
    path: '',
    component: OpenAddEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenAddEducationPageRoutingModule {}
