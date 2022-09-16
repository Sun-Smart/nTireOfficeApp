import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LetterrequestPageRoutingModule } from './letterrequest-routing.module';

import { LetterrequestPage } from './letterrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LetterrequestPageRoutingModule
  ],
  declarations: [LetterrequestPage]
})
export class LetterrequestPageModule {}
