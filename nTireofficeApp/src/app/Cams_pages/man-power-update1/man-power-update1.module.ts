// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManPowerUpdate1PageRoutingModule } from './man-power-update1-routing.module';

import { ManPowerUpdate1Page } from './man-power-update1.page';


import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';
// import { DatePipe } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManPowerUpdate1PageRoutingModule
  ],
  declarations: [ManPowerUpdate1Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class ManPowerUpdate1PageModule {}
