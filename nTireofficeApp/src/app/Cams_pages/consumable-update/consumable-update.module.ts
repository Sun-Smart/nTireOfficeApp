import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsumableUpdatePage } from './consumable-update.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumableUpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsumableUpdatePage]
})
export class ConsumableUpdatePageModule {}
