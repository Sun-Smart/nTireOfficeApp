import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoffRequestPageRoutingModule } from './coff-request-routing.module';
import { CoffRequestPage } from './coff-request.page';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoffRequestPageRoutingModule
  ],
  providers: [DatePipe],
  declarations: [CoffRequestPage]
})
export class CoffRequestPageModule {}
