import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineexamtimerPageRoutingModule } from './onlineexamtimer-routing.module';

import { OnlineexamtimerPage } from './onlineexamtimer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineexamtimerPageRoutingModule
  ],
  declarations: [OnlineexamtimerPage]
})
export class OnlineexamtimerPageModule {}
