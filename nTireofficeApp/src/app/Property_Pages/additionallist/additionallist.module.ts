import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionallistPageRoutingModule } from './additionallist-routing.module';

import { AdditionallistPage } from './additionallist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionallistPageRoutingModule
  ],
  declarations: [AdditionallistPage]
})
export class AdditionallistPageModule {}
