import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendormasterPageRoutingModule } from './vendormaster-routing.module';
import { VendormasterPage } from './vendormaster.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { VendormasterModelPage } from '../vendormaster-model/vendormaster-model.page';
// import { RouterModule  } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(),
    VendormasterPageRoutingModule,
    IonicSelectableModule,

  ],
  declarations: [VendormasterPage, VendormasterModelPage],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class VendormasterPageModule {}
