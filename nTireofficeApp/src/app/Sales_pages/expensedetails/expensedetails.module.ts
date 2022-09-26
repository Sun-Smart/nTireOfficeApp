import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ExpensedetailsPageRoutingModule } from './expensedetails-routing.module';

import { ExpensedetailsPage } from './expensedetails.page';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
const routes: Routes = [
  {
    path: '',
    component: ExpensedetailsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensedetailsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensedetailsPage],
  providers:[DatePipe,Camera]
})
export class ExpensedetailsPageModule {}
