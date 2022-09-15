import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsIssueStatusPageRoutingModule } from './pms-issue-status-routing.module';

import { PmsIssueStatusPage } from './pms-issue-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsIssueStatusPageRoutingModule
  ],
  declarations: [PmsIssueStatusPage]
})
export class PmsIssueStatusPageModule {}
