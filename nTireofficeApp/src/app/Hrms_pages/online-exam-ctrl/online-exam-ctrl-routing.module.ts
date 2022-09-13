import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineExamCtrlPage } from './online-exam-ctrl.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineExamCtrlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineExamCtrlPageRoutingModule {}
