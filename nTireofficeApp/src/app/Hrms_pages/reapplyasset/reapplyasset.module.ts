import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplyassetPageRoutingModule } from './reapplyasset-routing.module';

import { ReapplyassetPage } from './reapplyasset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplyassetPageRoutingModule
  ],
  declarations: [ReapplyassetPage]
})
export class ReapplyassetPageModule {}
