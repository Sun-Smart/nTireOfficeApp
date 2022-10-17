import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { IonicModule } from '@ionic/angular';

import { MaterialIssuePageRoutingModule } from './material-issue-routing.module';

import { MaterialIssuePage } from './material-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialIssuePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [MaterialIssuePage]
})
export class MaterialIssuePageModule {}
