import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { sparesUsedPage } from './spares-used.page';

const routes: Routes = [
  {
    path: '',
    component: sparesUsedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [sparesUsedPage],
  providers:[DatePipe]
})
export class sparesUsedPageModule {}
