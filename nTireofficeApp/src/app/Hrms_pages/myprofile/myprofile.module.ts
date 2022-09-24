import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { MyprofilePageRoutingModule } from './myprofile-routing.module';
import { Crop } from '@ionic-native/crop/ngx';
import { MyprofilePage } from './myprofile.page';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyprofilePageRoutingModule
  ],
  providers:[DatePipe,Base64,Crop,Camera],
  declarations: [MyprofilePage]
})
export class MyprofilePageModule {}
