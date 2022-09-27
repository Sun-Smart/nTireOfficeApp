import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtravelexpensedetailsPageRoutingModule } from './addtravelexpensedetails-routing.module';

import { AddtravelexpensedetailsPage } from './addtravelexpensedetails.page';
import { Routes, RouterModule } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
const routes: Routes = [
  {
    path: '',
    component: AddtravelexpensedetailsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtravelexpensedetailsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddtravelexpensedetailsPage],
  providers:[Camera]
})
export class AddtravelexpensedetailsPageModule {}
