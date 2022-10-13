import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { JobDetailPage } from './job-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe],
  declarations: [JobDetailPage]
})
export class JobDetailPageModule {}
