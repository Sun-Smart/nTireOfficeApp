import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateprsstatusPageRoutingModule } from './updateprsstatus-routing.module';

import { UpdateprsstatusPage } from './updateprsstatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateprsstatusPageRoutingModule
  ],
  declarations: [UpdateprsstatusPage]
})
export class UpdateprsstatusPageModule {}
