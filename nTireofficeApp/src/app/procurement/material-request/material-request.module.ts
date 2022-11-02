import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MaterialRequestPageRoutingModule } from './material-request-routing.module';

import { MaterialRequestPage } from './material-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialRequestPageRoutingModule
  ],
  declarations: [MaterialRequestPage],
  providers:[DatePipe]
})
export class MaterialRequestPageModule {}
