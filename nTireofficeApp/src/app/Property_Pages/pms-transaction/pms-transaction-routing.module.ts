import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PmsTransactionPage } from './pms-transaction.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: PmsTransactionPage
  }
];

@NgModule({
  imports: [HttpClientModule, NgxDatatableModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule, NgxDatatableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpClient],
})

export class PmsTransactionPageRoutingModule {}
