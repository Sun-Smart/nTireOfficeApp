import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { PmsdashboardPageRoutingModule } from './pmsdashboard-routing.module';
import { PmsdashboardPage } from './pmsdashboard.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // BrowserModule,
    IonicModule,
    HttpClientModule,
    NgxDatatableModule,
    PmsdashboardPageRoutingModule,
   
  ],
  declarations: [PmsdashboardPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PmsdashboardPageModule {}
