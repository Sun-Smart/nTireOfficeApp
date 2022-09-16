import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { IonicModule } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { File } from '@ionic-native/file/ngx';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
providers: [FileOpener,FileTransfer,File],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
