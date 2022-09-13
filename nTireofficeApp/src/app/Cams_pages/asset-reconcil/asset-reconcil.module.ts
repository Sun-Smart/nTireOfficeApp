import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssetReconcilPage } from './asset-reconcil.page';

const routes: Routes = [
  {
    path: '',
    component: AssetReconcilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssetReconcilPage]
})
export class AssetReconcilPageModule {}
