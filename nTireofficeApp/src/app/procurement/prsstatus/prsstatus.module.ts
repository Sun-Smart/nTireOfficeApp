import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PRSstatusPageRoutingModule } from './prsstatus-routing.module';

import { PRSstatusPage } from './prsstatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PRSstatusPageRoutingModule
  ],
  declarations: [PRSstatusPage]
})
export class PRSstatusPageModule {}
