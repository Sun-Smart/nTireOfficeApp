import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsumableUsedPage } from './consumable-used.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumableUsedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsumableUsedPage]
})
export class ConsumableUsedPageModule {}
