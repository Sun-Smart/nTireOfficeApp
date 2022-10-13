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
            // ../job-detail/job-detail.module#JobDetailPageModule
            {
              path: '',
              loadChildren: () => import('../job-detail/job-detail.module').then(m =>m.JobDetailPageModule)
              
            }
          ]
        },
        {
            path: 'task',
            children: [
              {
                // ../task-detail/task-detail.module#TaskDetailPageModule
                path: '',
                loadChildren: () => import('../task-detail/task-detail.module').then(m => m.TaskDetailPageModule)
              }
            ]
          },{
            path: 'manpowerUsed',
            children: [
              {
                // ../manpower-used/manpower-used.module#ManpowerUsedPageModule
                path: '',
                loadChildren: () => import('../manpower-used/manpower-used.module').then(m => m.ManpowerUsedPageModule)
              }
            ]
          },{
            path: 'sparesUsed',
            children: [
              {
                // ../spares-used/spares-used.module#sparesUsedPageModule
                path: '',
                loadChildren: () => import('../spares-used/spares-used.module').then(m => m.sparesUsedPageModule)
              }
            ]
          },{
            path: 'consumableUsed',
            children: [
              {
                // '../consumable-used/consumable-used.module#ConsumableUsedPageModule'
                path: '',
                loadChildren: () => import('../consumable-used/consumable-used.module').then(m => m.ConsumableUsedPageModule)
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
  