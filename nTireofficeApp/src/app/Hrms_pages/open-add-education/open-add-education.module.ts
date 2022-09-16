import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenAddEducationPageRoutingModule } from './open-add-education-routing.module';

import { OpenAddEducationPage } from './open-add-education.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenAddEducationPageRoutingModule
  ],
  declarations: [OpenAddEducationPage]
})
export class OpenAddEducationPageModule {}
