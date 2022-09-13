import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionanswerreportPageRoutingModule } from './questionanswerreport-routing.module';

import { QuestionanswerreportPage } from './questionanswerreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionanswerreportPageRoutingModule
  ],
  declarations: [QuestionanswerreportPage]
})
export class QuestionanswerreportPageModule {}
