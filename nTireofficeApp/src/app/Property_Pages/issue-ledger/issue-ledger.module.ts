import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueLedgerPageRoutingModule } from './issue-ledger-routing.module';

import { IssueLedgerPage } from './issue-ledger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueLedgerPageRoutingModule
  ],
  declarations: [IssueLedgerPage]
})
export class IssueLedgerPageModule {}
