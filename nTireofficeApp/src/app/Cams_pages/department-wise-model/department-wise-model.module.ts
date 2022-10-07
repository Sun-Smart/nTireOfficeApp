import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DepartmentWiseModelPage } from './department-wise-model.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentWiseModelPage
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
  declarations: [DepartmentWiseModelPage]
})
export class DepartmentWiseModelPageModule {}
