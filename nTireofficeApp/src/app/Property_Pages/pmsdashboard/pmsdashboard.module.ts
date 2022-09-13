import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsdashboardPageRoutingModule } from './pmsdashboard-routing.module';

import { PmsdashboardPage } from './pmsdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsdashboardPageRoutingModule
  ],
  declarations: [PmsdashboardPage]
})
export class PmsdashboardPageModule {}
