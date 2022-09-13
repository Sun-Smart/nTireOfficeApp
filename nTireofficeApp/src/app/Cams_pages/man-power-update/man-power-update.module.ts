import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManPowerUpdatePage } from './man-power-update.page';

const routes: Routes = [
  {
    path: '',
    component: ManPowerUpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManPowerUpdatePage]
})
export class ManPowerUpdatePageModule {}
