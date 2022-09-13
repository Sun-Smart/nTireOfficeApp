import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalacceptPageRoutingModule } from './approvalaccept-routing.module';

import { ApprovalacceptPage } from './approvalaccept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalacceptPageRoutingModule
  ],
  declarations: [ApprovalacceptPage]
})
export class ApprovalacceptPageModule {}
