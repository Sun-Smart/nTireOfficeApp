import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsemployeesPageRoutingModule } from './pmsemployees-routing.module';

import { PmsemployeesPage } from './pmsemployees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsemployeesPageRoutingModule
  ],
  declarations: [PmsemployeesPage]
})
export class PmsemployeesPageModule {}
