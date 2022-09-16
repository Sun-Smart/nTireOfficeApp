import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineexamreportsPageRoutingModule } from './onlineexamreports-routing.module';

import { OnlineexamreportsPage } from './onlineexamreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineexamreportsPageRoutingModule
  ],
  declarations: [OnlineexamreportsPage]
})
export class OnlineexamreportsPageModule {}
