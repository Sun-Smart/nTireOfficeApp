import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationWiseAssetPage } from './location-wise-asset.page';

const routes: Routes = [
  {
    path: '',
    component: LocationWiseAssetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocationWiseAssetPage]
})
export class LocationWiseAssetPageModule {}
