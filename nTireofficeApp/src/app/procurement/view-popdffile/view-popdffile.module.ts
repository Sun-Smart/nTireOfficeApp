import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ViewPOPDFFilePageRoutingModule } from './view-popdffile-routing.module';

import { ViewPOPDFFilePage } from './view-popdffile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPOPDFFilePageRoutingModule
  ],
  declarations: [ViewPOPDFFilePage],
  providers:[DatePipe]
})
export class ViewPOPDFFilePageModule {}
