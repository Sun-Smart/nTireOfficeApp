import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServiceListPage } from './service-list.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe,BarcodeScanner],
  declarations: [ServiceListPage]
})
export class ServiceListPageModule {}
