import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManpowerUsedPage } from './manpower-used.page';

const routes: Routes = [
  {
    path: '',
    component: ManpowerUsedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManpowerUsedPage]
})
export class ManpowerUsedPageModule {}
