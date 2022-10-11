import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtravelexpensedetailsPageRoutingModule } from './addtravelexpensedetails-routing.module';

import { AddtravelexpensedetailsPage } from './addtravelexpensedetails.page';
import { Routes, RouterModule } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
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
  providers:[Crop,Base64,Camera]
})
export class AddtravelexpensedetailsPageModule {}
