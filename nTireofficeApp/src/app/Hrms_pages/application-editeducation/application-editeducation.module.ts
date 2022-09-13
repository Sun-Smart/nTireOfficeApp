import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationEditeducationPageRoutingModule } from './application-editeducation-routing.module';

import { ApplicationEditeducationPage } from './application-editeducation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationEditeducationPageRoutingModule
  ],
  declarations: [ApplicationEditeducationPage]
})
export class ApplicationEditeducationPageModule {}
