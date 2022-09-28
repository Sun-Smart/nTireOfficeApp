import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { PmsTransactionPageRoutingModule } from './pms-transaction-routing.module';
import { PmsTransactionPage } from './pms-transaction.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    NgxDatatableModule,
    PmsTransactionPageRoutingModule
  ],
  declarations: [PmsTransactionPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PmsTransactionPageModule {}
