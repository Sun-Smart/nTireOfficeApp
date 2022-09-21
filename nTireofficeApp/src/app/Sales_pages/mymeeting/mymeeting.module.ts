import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MymeetingPageRoutingModule } from './mymeeting-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { MymeetingPage } from './mymeeting.page';
const routes: Routes = [
  {
    path: '',
    component: MymeetingPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MymeetingPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MymeetingPage],
  providers:[DatePipe]
})
export class MymeetingPageModule {}
