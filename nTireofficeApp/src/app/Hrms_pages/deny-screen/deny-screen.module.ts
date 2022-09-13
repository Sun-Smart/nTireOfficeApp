import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DenyScreenPageRoutingModule } from './deny-screen-routing.module';

import { DenyScreenPage } from './deny-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DenyScreenPageRoutingModule
  ],
  declarations: [DenyScreenPage]
})
export class DenyScreenPageModule {}
