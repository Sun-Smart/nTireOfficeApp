import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateleadsPageRoutingModule } from './updateleads-routing.module';

import { UpdateleadsPage } from './updateleads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateleadsPageRoutingModule
  ],
  declarations: [UpdateleadsPage]
})
export class UpdateleadsPageModule {}
