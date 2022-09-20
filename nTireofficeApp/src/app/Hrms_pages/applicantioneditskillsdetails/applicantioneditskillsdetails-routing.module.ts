import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationeditskillsdetailsPage } from './applicantioneditskillsdetails.page';

// import { ApplicantioneditskillsdetailsPage } from './applicantioneditskillsdetails.page';

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
export class ApplicantioneditskillsdetailsPageRoutingModule {}
