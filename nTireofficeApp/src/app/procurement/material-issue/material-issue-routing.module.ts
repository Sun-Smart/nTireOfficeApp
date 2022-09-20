import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialIssuePage } from './material-issue.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialIssuePageRoutingModule {}
