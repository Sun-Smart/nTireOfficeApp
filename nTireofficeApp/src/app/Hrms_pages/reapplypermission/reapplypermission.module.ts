import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReapplypermissionPageRoutingModule } from './reapplypermission-routing.module';

import { ReapplypermissionPage } from './reapplypermission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReapplypermissionPageRoutingModule
  ],
  declarations: [ReapplypermissionPage]
})
export class ReapplypermissionPageModule {}
