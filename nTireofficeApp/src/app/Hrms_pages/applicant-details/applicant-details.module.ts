import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CameraserviceService} from '../../service/cameraservice.service';
import { CameraService } from 'src/app/service/camera.service';
import { ApplicantDetailsPageRoutingModule } from './applicant-details-routing.module';

import { ApplicantDetailsPage } from './applicant-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantDetailsPageRoutingModule
  ],
  providers: [CameraService, CameraserviceService],
  declarations: [ApplicantDetailsPage]
})
export class ApplicantDetailsPageModule {}
