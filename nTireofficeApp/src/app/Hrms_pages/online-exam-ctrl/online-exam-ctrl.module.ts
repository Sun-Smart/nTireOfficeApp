import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineExamCtrlPageRoutingModule } from './online-exam-ctrl-routing.module';

import { OnlineExamCtrlPage } from './online-exam-ctrl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineExamCtrlPageRoutingModule
  ],
  declarations: [OnlineExamCtrlPage]
})
export class OnlineExamCtrlPageModule {}
