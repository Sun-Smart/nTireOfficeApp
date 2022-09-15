import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsCreateIssuePageRoutingModule } from './pms-create-issue-routing.module';

import { PmsCreateIssuePage } from './pms-create-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsCreateIssuePageRoutingModule
  ],
  declarations: [PmsCreateIssuePage]
})
export class PmsCreateIssuePageModule {}
