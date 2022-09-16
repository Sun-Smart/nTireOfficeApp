import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionanswerreportPage } from './questionanswerreport.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionanswerreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionanswerreportPageRoutingModule {}
