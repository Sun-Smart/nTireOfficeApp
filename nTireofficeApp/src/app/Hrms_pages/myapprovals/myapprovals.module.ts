import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyapprovalsPageRoutingModule } from './myapprovals-routing.module';

import { MyapprovalsPage } from './myapprovals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyapprovalsPageRoutingModule
  ],
  declarations: [MyapprovalsPage]
})
export class MyapprovalsPageModule {}
