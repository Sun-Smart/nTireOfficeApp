import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewleadRetailPageRoutingModule } from './newlead-retail-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { NewleadRetailPage } from './newlead-retail.page';
import { DatePipe } from '@angular/common';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
const routes: Routes = [
  {
    path: '',
    component: NewleadRetailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewleadRetailPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewleadRetailPage],
  providers:[DatePipe,Crop,Base64,Camera],
  schemas:[NO_ERRORS_SCHEMA]
})
export class NewleadRetailPageModule {}
