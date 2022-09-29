import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageRfqPageRoutingModule } from './manage-rfq-routing.module';

import { ManageRfqPage } from './manage-rfq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageRfqPageRoutingModule
  ],
  declarations: [ManageRfqPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})
export class ManageRfqPageModule {}
