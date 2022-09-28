import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PmsemployeesPageRoutingModule } from './pmsemployees-routing.module';
import { PmsemployeesPage } from './pmsemployees.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    PmsemployeesPageRoutingModule
  ],
  declarations: [PmsemployeesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PmsemployeesPageModule {}
