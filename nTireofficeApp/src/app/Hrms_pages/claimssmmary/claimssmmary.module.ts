import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimssmmaryPageRoutingModule } from './claimssmmary-routing.module';

import { ClaimssmmaryPage } from './claimssmmary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimssmmaryPageRoutingModule
  ],
  declarations: [ClaimssmmaryPage]
})
export class ClaimssmmaryPageModule {}
