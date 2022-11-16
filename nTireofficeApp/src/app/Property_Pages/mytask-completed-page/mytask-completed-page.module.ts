import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytaskCompletedPagePageRoutingModule } from './mytask-completed-page-routing.module';

import { MytaskCompletedPagePage } from './mytask-completed-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytaskCompletedPagePageRoutingModule
  ],
  declarations: [MytaskCompletedPagePage]
})
export class MytaskCompletedPagePageModule {}
