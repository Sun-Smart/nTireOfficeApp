import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { VendorQuotationPage } from './vendor-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: VendorQuotationPage
  }
];

@NgModule({
  imports: [HttpClientModule, NgxDatatableModule, RouterModule.forChild(routes)],
  exports: [RouterModule, NgxDatatableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpClient],
})
export class VendorQuotationPageRoutingModule {}
