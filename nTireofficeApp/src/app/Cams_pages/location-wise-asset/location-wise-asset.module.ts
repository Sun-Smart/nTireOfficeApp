import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  providers:[DatePipe],
  declarations: [LocationWiseAssetPage]
})
export class LocationWiseAssetPageModule {}
