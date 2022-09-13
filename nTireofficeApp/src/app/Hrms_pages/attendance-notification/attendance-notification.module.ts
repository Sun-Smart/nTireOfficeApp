import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceNotificationPageRoutingModule } from './attendance-notification-routing.module';

import { AttendanceNotificationPage } from './attendance-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceNotificationPageRoutingModule
  ],
  declarations: [AttendanceNotificationPage]
})
export class AttendanceNotificationPageModule {}
