import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaveRequestPageRoutingModule } from './leave-request-routing.module';

import { LeaveRequestPage } from './leave-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveRequestPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [LeaveRequestPage]
})
export class LeaveRequestPageModule {}
