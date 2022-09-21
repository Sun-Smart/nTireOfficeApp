import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ClosedleadsPageRoutingModule } from './closedleads-routing.module';

import { ClosedleadsPage } from './closedleads.page';
import { Media } from '@ionic-native/media/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
const routes: Routes = [
  {
    path: '',
    component: ClosedleadsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosedleadsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClosedleadsPage],
  providers:[Media,DatePipe,CallNumber,File,FileTransfer]
})
export class ClosedleadsPageModule {}
