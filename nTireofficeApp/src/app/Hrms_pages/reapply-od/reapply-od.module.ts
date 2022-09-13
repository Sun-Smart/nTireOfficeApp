import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplyOdPageRoutingModule } from './reapply-od-routing.module';

import { ReapplyOdPage } from './reapply-od.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplyOdPageRoutingModule
  ],
  declarations: [ReapplyOdPage]
})
export class ReapplyOdPageModule {}
