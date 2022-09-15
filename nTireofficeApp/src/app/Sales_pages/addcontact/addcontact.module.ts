import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { AddcontactPageRoutingModule } from './addcontact-routing.module';

import { AddcontactPage } from './addcontact.page';
const routes: Routes = [
  {
    path: '',
    component: AddcontactPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcontactPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddcontactPage]
})
export class AddcontactPageModule {}
