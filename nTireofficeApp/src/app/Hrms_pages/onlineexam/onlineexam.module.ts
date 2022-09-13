import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineexamPageRoutingModule } from './onlineexam-routing.module';

import { OnlineexamPage } from './onlineexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineexamPageRoutingModule
  ],
  declarations: [OnlineexamPage]
})
export class OnlineexamPageModule {}
