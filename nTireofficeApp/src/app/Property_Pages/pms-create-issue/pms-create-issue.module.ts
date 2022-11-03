import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PmsCreateIssuePageRoutingModule } from './pms-create-issue-routing.module';
import { PmsCreateIssuePage } from './pms-create-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PmsCreateIssuePageRoutingModule
  ],
  declarations: [PmsCreateIssuePage],
  providers: [DatePipe]
})
export class PmsCreateIssuePageModule { }
