import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyCondactListPageRoutingModule } from './property-condact-list-routing.module';

import { PropertyCondactListPage } from './property-condact-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyCondactListPageRoutingModule
  ],
  declarations: [PropertyCondactListPage]
})
export class PropertyCondactListPageModule {}
