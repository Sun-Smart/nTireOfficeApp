import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { PendingJobsPage } from './pending-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: PendingJobsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe,BarcodeScanner],
  declarations: [PendingJobsPage]
})
export class PendingJobsPageModule {}
