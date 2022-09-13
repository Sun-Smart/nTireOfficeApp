import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationeditskillsdetailsPage } from './applicationeditskillsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationeditskillsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationeditskillsdetailsPageRoutingModule {}
