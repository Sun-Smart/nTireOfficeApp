import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageviewPageRoutingModule } from './imageview-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { ImageviewPage } from './imageview.page';
const routes: Routes = [
  {
    path: '',
    component: ImageviewPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageviewPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImageviewPage]
})
export class ImageviewPageModule {}
