import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenaddemploymentpagePageRoutingModule } from './openaddemploymentpage-routing.module';

import { OpenaddemploymentpagePage } from './openaddemploymentpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenaddemploymentpagePageRoutingModule
  ],
  declarations: [OpenaddemploymentpagePage]
})
export class OpenaddemploymentpagePageModule {}
