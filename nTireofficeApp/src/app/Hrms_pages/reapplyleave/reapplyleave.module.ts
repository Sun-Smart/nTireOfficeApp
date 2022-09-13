import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplyleavePageRoutingModule } from './reapplyleave-routing.module';

import { ReapplyleavePage } from './reapplyleave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplyleavePageRoutingModule
  ],
  declarations: [ReapplyleavePage]
})
export class ReapplyleavePageModule {}
