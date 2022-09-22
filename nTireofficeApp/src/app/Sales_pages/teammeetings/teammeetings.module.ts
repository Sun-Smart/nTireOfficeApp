import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { TeammeetingsPageRoutingModule } from './teammeetings-routing.module';

import { TeammeetingsPage } from './teammeetings.page';
const routes: Routes = [
  {
    path: '',
    component: TeammeetingsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeammeetingsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeammeetingsPage],
  providers:[DatePipe]
})
export class TeammeetingsPageModule {}
