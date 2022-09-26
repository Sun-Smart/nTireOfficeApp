import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AssetDetailsPage } from './asset-details.page';
import { File } from '@ionic-native/file/ngx';



const routes: Routes = [
  {
    path: '',
    component: AssetDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe,Crop,Base64,Camera,File],
  declarations: [AssetDetailsPage]
})
export class AssetDetailsPageModule {}
