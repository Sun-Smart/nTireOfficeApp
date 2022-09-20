import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { OdRequestPageRoutingModule } from './od-request-routing.module';

import { OdRequestPage } from './od-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdRequestPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [OdRequestPage]
})
export class OdRequestPageModule {}
