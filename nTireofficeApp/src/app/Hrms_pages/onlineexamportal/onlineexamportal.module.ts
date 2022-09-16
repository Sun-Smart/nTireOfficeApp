import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineexamportalPageRoutingModule } from './onlineexamportal-routing.module';

import { OnlineexamportalPage } from './onlineexamportal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineexamportalPageRoutingModule
  ],
  declarations: [OnlineexamportalPage]
})
export class OnlineexamportalPageModule {}
