import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalPagePageRoutingModule } from './additional-page-routing.module';

import { AdditionalPagePage } from './additional-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalPagePageRoutingModule
  ],
  declarations: [AdditionalPagePage],
  providers:[DatePipe]
})
export class AdditionalPagePageModule {}
