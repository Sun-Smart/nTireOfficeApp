import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatevendorquotPageRoutingModule } from './updatevendorquot-routing.module';

import { UpdatevendorquotPage } from './updatevendorquot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatevendorquotPageRoutingModule
  ],
  declarations: [UpdatevendorquotPage]
})
export class UpdatevendorquotPageModule {}
