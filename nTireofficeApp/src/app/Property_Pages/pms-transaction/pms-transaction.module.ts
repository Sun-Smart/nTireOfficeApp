import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmsTransactionPageRoutingModule } from './pms-transaction-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PmsTransactionPage } from './pms-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    PmsTransactionPageRoutingModule
  ],
  declarations: [PmsTransactionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PmsTransactionPageModule {}
