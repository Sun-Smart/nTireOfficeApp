/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { PendingleadsPageRoutingModule } from './pendingleads-routing.module';

import { PendingleadsPage } from './pendingleads.page';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
const routes: Routes = [
  {
    path: '',
    component: PendingleadsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingleadsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PendingleadsPage],
  providers:[Media,DatePipe,CallNumber,File,FileTransfer],
  schemas:[NO_ERRORS_SCHEMA]
})
export class PendingleadsPageModule {}
