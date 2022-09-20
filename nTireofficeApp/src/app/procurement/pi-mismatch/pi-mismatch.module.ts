import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiMismatchPageRoutingModule } from './pi-mismatch-routing.module';

import { PiMismatchPage } from './pi-mismatch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiMismatchPageRoutingModule
  ],
  declarations: [PiMismatchPage]
})
export class PiMismatchPageModule {}
