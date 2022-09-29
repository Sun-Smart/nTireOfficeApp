import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PmsdashboardPage } from './pmsdashboard.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: PmsdashboardPage
  }
];

@NgModule({
  imports: [HttpClientModule,NgxDatatableModule,RouterModule.forChild(routes)],
  exports: [NgxDatatableModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpClient],
})
export class PmsdashboardPageRoutingModule {}
