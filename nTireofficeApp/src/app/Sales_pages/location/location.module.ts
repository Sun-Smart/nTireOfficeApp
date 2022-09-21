import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { LocationPage } from './location.page';
const routes: Routes = [
  {
    path: '',
    component: LocationPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocationPage],
  providers:[DatePipe ]
})
export class LocationPageModule {}
