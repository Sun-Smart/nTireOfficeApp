import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplycoffPageRoutingModule } from './reapplycoff-routing.module';

import { ReapplycoffPage } from './reapplycoff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplycoffPageRoutingModule
  ],
  declarations: [ReapplycoffPage]
})
export class ReapplycoffPageModule {}
