import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatevendorquotPageRoutingModule } from './updatevendorquot-routing.module';
import { UpdatevendorquotPage } from './updatevendorquot.page';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatevendorquotPageRoutingModule
  ],
  declarations: [UpdatevendorquotPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UpdatevendorquotPageModule {}
