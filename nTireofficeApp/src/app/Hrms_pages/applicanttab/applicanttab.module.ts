import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicanttabPageRoutingModule } from './applicanttab-routing.module';

import { ApplicanttabPage } from './applicanttab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicanttabPageRoutingModule
  ],
  declarations: [ApplicanttabPage]
})
export class ApplicanttabPageModule {}
