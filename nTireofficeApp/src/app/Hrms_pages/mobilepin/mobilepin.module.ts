import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilepinPageRoutingModule } from './mobilepin-routing.module';

import { MobilepinPage } from './mobilepin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilepinPageRoutingModule
  ],
  declarations: [MobilepinPage]
})
export class MobilepinPageModule {}
