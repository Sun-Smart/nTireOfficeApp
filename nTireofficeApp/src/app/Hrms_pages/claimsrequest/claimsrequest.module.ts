import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimsrequestPageRoutingModule } from './claimsrequest-routing.module';

import { ClaimsrequestPage } from './claimsrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimsrequestPageRoutingModule
  ],
  declarations: [ClaimsrequestPage]
})
export class ClaimsrequestPageModule {}
