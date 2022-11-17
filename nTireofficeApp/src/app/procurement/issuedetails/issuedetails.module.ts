import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { IssuedetailsPageRoutingModule } from './issuedetails-routing.module';

import { IssuedetailsPage } from './issuedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssuedetailsPageRoutingModule
  ],
  declarations: [IssuedetailsPage],
  providers:[DatePipe]
})
export class IssuedetailsPageModule {}
