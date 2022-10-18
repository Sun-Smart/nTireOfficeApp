import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  providers: [DatePipe],
  declarations: [PermissionsummaryPage]
})
export class PermissionsummaryPageModule {}
