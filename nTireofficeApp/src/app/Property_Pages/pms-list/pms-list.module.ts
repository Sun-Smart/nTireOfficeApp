import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsListPageRoutingModule } from './pms-list-routing.module';

import { PmsListPage } from './pms-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmsListPageRoutingModule
  ],
  declarations: [PmsListPage]
})
export class PmsListPageModule {}
