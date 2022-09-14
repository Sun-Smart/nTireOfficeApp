import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PmscustomerPageRoutingModule } from './pmscustomer-routing.module';
import { PmscustomerPage } from './pmscustomer.page';


const routes: Routes = [
  {
    path: '',
    component: PmscustomerPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    PmscustomerPageRoutingModule
  ],
  declarations: [PmscustomerPage]
})
export class PmscustomerPageModule {}
