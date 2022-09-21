import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeatmapPageRoutingModule } from './heatmap-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapPage } from './heatmap.page';
const routes: Routes = [
  {
    path: '',
    component: HeatmapPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeatmapPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeatmapPage]
})
export class HeatmapPageModule {}
