import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PmsTransactionPage } from './pms-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: PmsTransactionPage
  }
];

@NgModule({
  imports: [HttpClientModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpClient],
})

export class PmsTransactionPageRoutingModule {}
