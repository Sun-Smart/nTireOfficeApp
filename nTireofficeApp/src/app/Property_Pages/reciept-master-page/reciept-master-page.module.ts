import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecieptMasterPagePageRoutingModule } from './reciept-master-page-routing.module';

import { RecieptMasterPagePage } from './reciept-master-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecieptMasterPagePageRoutingModule
  ],
  declarations: [RecieptMasterPagePage]
})
export class RecieptMasterPagePageModule {}
