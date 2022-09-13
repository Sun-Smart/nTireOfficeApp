import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DepartmentWisePage } from './department-wise.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentWisePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepartmentWisePage]
})
export class DepartmentWisePageModule {}
