import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanRequestPageRoutingModule } from './loan-request-routing.module';

import { LoanRequestPage } from './loan-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanRequestPageRoutingModule
  ],
  declarations: [LoanRequestPage]
})
export class LoanRequestPageModule {}
