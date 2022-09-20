import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssetrequestPageRoutingModule } from './assetrequest-routing.module';
import { AssetrequestPage } from './assetrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetrequestPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [AssetrequestPage]
})
export class AssetrequestPageModule {}
