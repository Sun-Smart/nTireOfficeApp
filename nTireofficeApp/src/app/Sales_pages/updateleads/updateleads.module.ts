import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { UpdateleadsPageRoutingModule } from './updateleads-routing.module';

import { UpdateleadsPage } from './updateleads.page';
const routes: Routes = [
  {
    path: '',
    component: UpdateleadsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateleadsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateleadsPage]
})
export class UpdateleadsPageModule {}
