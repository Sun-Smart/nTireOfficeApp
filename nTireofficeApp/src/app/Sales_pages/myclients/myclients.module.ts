import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyclientsPageRoutingModule } from './myclients-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { MyclientsPage } from './myclients.page';
const routes: Routes = [
  {
    path: '',
    component: MyclientsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyclientsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyclientsPage],
  providers:[DatePipe]
})
export class MyclientsPageModule {}
