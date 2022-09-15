import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatevendoritemPageRoutingModule } from './updatevendoritem-routing.module';

import { UpdatevendoritemPage } from './updatevendoritem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatevendoritemPageRoutingModule
  ],
  declarations: [UpdatevendoritemPage]
})
export class UpdatevendoritemPageModule {}
