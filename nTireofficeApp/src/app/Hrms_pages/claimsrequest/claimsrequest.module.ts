import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClaimsrequestPageRoutingModule } from './claimsrequest-routing.module';
import { ClaimsrequestPage } from './claimsrequest.page';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraService } from 'src/app/service/camera.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimsrequestPageRoutingModule
  ],
  providers: [DatePipe, Crop, Base64, Camera, CameraService],
  declarations: [ClaimsrequestPage]
})
export class ClaimsrequestPageModule {}
