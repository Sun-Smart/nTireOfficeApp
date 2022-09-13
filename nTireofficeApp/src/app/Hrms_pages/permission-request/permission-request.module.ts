import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionRequestPageRoutingModule } from './permission-request-routing.module';

import { PermissionRequestPage } from './permission-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionRequestPageRoutingModule
  ],
  declarations: [PermissionRequestPage]
})
export class PermissionRequestPageModule {}
