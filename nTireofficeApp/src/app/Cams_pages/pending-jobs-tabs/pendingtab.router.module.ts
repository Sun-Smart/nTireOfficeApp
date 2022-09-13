import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingJobsTabsPage } from './pending-jobs-tabs.page';

const routes: Routes = [
    {
      path: 'pending-jobs-tabs',
      component: PendingJobsTabsPage,
      children: [
        {
          path: 'job-detail',
          children: [
            {
              path: '',
              loadChildren:'../job-detail/job-detail.module#JobDetailPageModule'
              
            }
          ]
        },
        {
            path: 'task',
            children: [
              {
                path: '',
                loadChildren: '../task-detail/task-detail.module#TaskDetailPageModule'
              }
            ]
          },{
            path: 'manpowerUsed',
            children: [
              {
                path: '',
                loadChildren: '../manpower-used/manpower-used.module#ManpowerUsedPageModule'
              }
            ]
          },{
            path: 'sparesUsed',
            children: [
              {
                path: '',
                loadChildren: '../spares-used/spares-used.module#sparesUsedPageModule'
              }
            ]
          },{
            path: 'consumableUsed',
            children: [
              {
                path: '',
                loadChildren: '../consumable-used/consumable-used.module#ConsumableUsedPageModule'
              }
            ]
          },
    
        
         
        {
          path: '',
          redirectTo: '/pending-jobs-tabs/job-detail',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/pending-jobs-tabs/pending-jobs-tabs/job-detail',
      pathMatch: 'full'
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PendingtabPageRoutingModule {}
  