import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  declarations: [AdditionalPagePage]
})
export class AdditionalPagePageModule {}
