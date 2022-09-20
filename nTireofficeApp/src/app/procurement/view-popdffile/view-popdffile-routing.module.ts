import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPOPDFFilePage } from './view-popdffile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPOPDFFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPOPDFFilePageRoutingModule {}
