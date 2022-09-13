import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionreportPage } from './questionreport.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionreportPageRoutingModule {}
