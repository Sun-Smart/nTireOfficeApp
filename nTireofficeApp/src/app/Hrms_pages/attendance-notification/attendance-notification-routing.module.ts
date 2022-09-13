import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceNotificationPage } from './attendance-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceNotificationPageRoutingModule {}
