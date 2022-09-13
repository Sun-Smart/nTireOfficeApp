import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PendingJobsTabsPage } from './pending-jobs-tabs.page';
import {PendingtabPageRoutingModule} from '../pending-jobs-tabs/pendingtab.router.module'

const routes: Routes = [
  {
    path: '',
    component: PendingJobsTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingtabPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PendingJobsTabsPage]
})
export class PendingJobsTabsPageModule {}
