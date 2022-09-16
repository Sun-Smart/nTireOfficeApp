import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionreportPageRoutingModule } from './questionreport-routing.module';

import { QuestionreportPage } from './questionreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionreportPageRoutingModule
  ],
  declarations: [QuestionreportPage]
})
export class QuestionreportPageModule {}
