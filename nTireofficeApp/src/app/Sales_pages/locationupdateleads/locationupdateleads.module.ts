import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { LocationupdateleadsPageRoutingModule } from './locationupdateleads-routing.module';

import { LocationupdateleadsPage } from './locationupdateleads.page';
const routes: Routes = [
  {
    path: '',
    component: LocationupdateleadsPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationupdateleadsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocationupdateleadsPage]
})
export class LocationupdateleadsPageModule {}
