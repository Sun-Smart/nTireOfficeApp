import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationEditeducationPage } from './application-editeducation.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationEditeducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationEditeducationPageRoutingModule {}
