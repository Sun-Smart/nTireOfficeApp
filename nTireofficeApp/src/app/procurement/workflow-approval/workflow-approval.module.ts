import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkflowApprovalPageRoutingModule } from './workflow-approval-routing.module';

import { WorkflowApprovalPage } from './workflow-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkflowApprovalPageRoutingModule
  ],
  declarations: [WorkflowApprovalPage]
})
export class WorkflowApprovalPageModule {}
