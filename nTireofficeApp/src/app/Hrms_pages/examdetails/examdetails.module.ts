import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamdetailsPageRoutingModule } from './examdetails-routing.module';

import { ExamdetailsPage } from './examdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamdetailsPageRoutingModule
  ],
  declarations: [ExamdetailsPage]
})
export class ExamdetailsPageModule {}
