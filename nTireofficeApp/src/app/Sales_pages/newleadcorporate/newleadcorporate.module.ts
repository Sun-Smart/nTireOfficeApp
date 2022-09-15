import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewleadcorporatePageRoutingModule } from './newleadcorporate-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { NewleadcorporatePage } from './newleadcorporate.page';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera/ngx';
const routes: Routes = [
  {
    path: '',
    component: NewleadcorporatePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewleadcorporatePageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewleadcorporatePage],
  providers:[Crop,Base64,Camera]
})
export class NewleadcorporatePageModule {}
