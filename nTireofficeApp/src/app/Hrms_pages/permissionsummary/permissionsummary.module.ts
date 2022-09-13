import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionsummaryPageRoutingModule } from './permissionsummary-routing.module';

import { PermissionsummaryPage } from './permissionsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionsummaryPageRoutingModule
  ],
  declarations: [PermissionsummaryPage]
})
export class PermissionsummaryPageModule {}
