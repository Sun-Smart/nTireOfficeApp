import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CompletionJobsPage } from './completion-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: CompletionJobsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[DatePipe],
  declarations: [CompletionJobsPage]
})
export class CompletionJobsPageModule {}
