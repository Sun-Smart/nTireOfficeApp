import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  providers: [DatePipe],
  declarations: [PermissionRequestPage]
})
export class PermissionRequestPageModule {}
