import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplyloanPageRoutingModule } from './reapplyloan-routing.module';

import { ReapplyloanPage } from './reapplyloan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplyloanPageRoutingModule
  ],
  declarations: [ReapplyloanPage]
})
export class ReapplyloanPageModule {}
